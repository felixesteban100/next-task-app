"use server"

import { addDefaultTasksWithTodaysDate } from "@/server/actions";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const success = await addDefaultTasksWithTodaysDate()
        revalidatePath("/")
        revalidatePath("/previous-days")
        return NextResponse.json({ success: true, dayWereAdded: success });
    } catch (error) {
        return NextResponse.json({ success: false, error });
    }
}