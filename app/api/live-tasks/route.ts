// import { NextResponse } from 'next/server';
// import { collectionTask } from '@/db/mongodb/mongodb';

// export const dynamic = 'force-dynamic';

export async function GET(/* request: Request */) {
    // and I need to know if I really need auto refresh when db changes 
    return {}

    // const { searchParams } = new URL(request.url);
    // const dateStr = searchParams.get('date');

    // if (!dateStr) {
    //     return NextResponse.json({ error: 'Date required' }, { status: 400 });
    // }

    // const date = new Date(dateStr);

    // // Your existing query logic to get tasks for that date
    // // Example (adapt to your actual DB query):
    // const tasks = await collectionTask.find({ /* filter by date/user */ }).toArray();

    // return NextResponse.json({
    //     tasks,
    //     date: date.toISOString(),
    // });
}


// // app/api/live-tasks/route.ts
// import { NextResponse } from 'next/server';
// import { db } from '@/db/mongodb/mongodb'; // ← Option 2 style
// import {
//     ChangeStreamDocument,
//     ChangeStreamInsertDocument,
//     ChangeStreamUpdateDocument,
//     ChangeStreamReplaceDocument,
//     ChangeStreamDeleteDocument,
// } from 'mongodb';
// import { DailyTaskAndDetails } from '@/components/TaskToEdit';

// export const dynamic = 'force-dynamic';
// export const maxDuration = 60;  // 60 seconds max on Hobby (up to 300s on Pro/Ent)
// export const runtime = 'nodejs';  // Use Node.js runtime (not edge — edge max is ~30s and no state)

// export async function GET(request: Request) {
//     const encoder = new TextEncoder();

//     const stream = new ReadableStream({
//         async start(controller) {
//             const collection = db.collection("Task"); // or use your exported collectionTask()

//             const changeStream = collection.watch([], {
//                 fullDocument: 'updateLookup'
//             });

//             const heartbeat = setInterval(() => {
//                 controller.enqueue(encoder.encode(`data: {"type":"ping"}\n\n`));
//             }, 15000);

//             changeStream.on('change', (rawChange: ChangeStreamDocument<DailyTaskAndDetails>) => {
//                 // Narrow to types that have what we need
//                 if (
//                     rawChange.operationType === 'insert' ||
//                     rawChange.operationType === 'update' ||
//                     rawChange.operationType === 'replace'
//                 ) {
//                     const change = rawChange as
//                         | ChangeStreamInsertDocument<DailyTaskAndDetails>
//                         | ChangeStreamUpdateDocument<DailyTaskAndDetails>
//                         | ChangeStreamReplaceDocument<DailyTaskAndDetails>;

//                     const payload = JSON.stringify({
//                         type: change.operationType,
//                         documentKey: change.documentKey,
//                         document: change.fullDocument,           // guaranteed when { fullDocument: 'updateLookup' }
//                     });

//                     controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
//                 } else if (rawChange.operationType === 'delete') {
//                     const change = rawChange as ChangeStreamDeleteDocument<DailyTaskAndDetails>;
//                     // You have documentKey, but no fullDocument
//                     const payload = JSON.stringify({
//                         type: 'delete',
//                         documentKey: change.documentKey,
//                     });
//                     controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
//                 }
//                 // ignore drop/invalidate/rename etc.
//             });

//             request.signal.addEventListener('abort', () => {
//                 clearInterval(heartbeat);
//                 changeStream.close().catch(() => { });
//             });
//         }
//     });

//     return new NextResponse(stream, {
//         headers: {
//             'Content-Type': 'text/event-stream',
//             'Cache-Control': 'no-cache',
//             'Connection': 'keep-alive',
//         }
//     });
// }