// app/api/live-tasks/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db/mongodb/mongodb'; // ← Option 2 style
import {
    ChangeStreamDocument,
    ChangeStreamInsertDocument,
    ChangeStreamUpdateDocument,
    ChangeStreamReplaceDocument,
    ChangeStreamDeleteDocument,
} from 'mongodb';
import { DailyTaskAndDetails } from '@/components/TaskToEdit';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            const collection = db.collection("Task"); // or use your exported collectionTask()

            const changeStream = collection.watch([], {
                fullDocument: 'updateLookup'
            });

            const heartbeat = setInterval(() => {
                controller.enqueue(encoder.encode(`data: {"type":"ping"}\n\n`));
            }, 15000);

            changeStream.on('change', (rawChange: ChangeStreamDocument<DailyTaskAndDetails>) => {
                // Narrow to types that have what we need
                if (
                    rawChange.operationType === 'insert' ||
                    rawChange.operationType === 'update' ||
                    rawChange.operationType === 'replace'
                ) {
                    const change = rawChange as
                        | ChangeStreamInsertDocument<DailyTaskAndDetails>
                        | ChangeStreamUpdateDocument<DailyTaskAndDetails>
                        | ChangeStreamReplaceDocument<DailyTaskAndDetails>;

                    const payload = JSON.stringify({
                        type: change.operationType,
                        documentKey: change.documentKey,
                        document: change.fullDocument,           // guaranteed when { fullDocument: 'updateLookup' }
                    });

                    controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
                } else if (rawChange.operationType === 'delete') {
                    const change = rawChange as ChangeStreamDeleteDocument<DailyTaskAndDetails>;
                    // You have documentKey, but no fullDocument
                    const payload = JSON.stringify({
                        type: 'delete',
                        documentKey: change.documentKey,
                    });
                    controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
                }
                // ignore drop/invalidate/rename etc.
            });

            request.signal.addEventListener('abort', () => {
                clearInterval(heartbeat);
                changeStream.close().catch(() => { });
            });
        }
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        }
    });
}