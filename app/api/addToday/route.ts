import { addDefaultTasksWithTodaysDate } from "@/server/actions";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const tasks = await addDefaultTasksWithTodaysDate()
        return NextResponse.json({ success: true, tasks });
    } catch (error) {
        return NextResponse.json({ success: false, error });
    }
}
