"use server"

import { Task } from "@/components/TaskToEdit"
import { DEFAULT_TASKS } from "@/constants"
import { collectionTask } from "@/db/mongodb/mongodb"
import { getTodaysDate } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { connection } from 'next/server'

export async function addDefaultTasksWithTodaysDate() {
    connection()
    const todayDate = getTodaysDate()
    const existingDay = await collectionTask.findOne({ date: todayDate });

    if (existingDay) return false

    await collectionTask.insertOne({ tasks: DEFAULT_TASKS, date: todayDate })
    return true
}

export async function saveTasksOfCurrentDate(date: string, tasks: Task[]) {
    connection()
    const result = await collectionTask.updateOne(
        { date },
        { $set: { tasks: tasks } }, // ✅ Use `$set` to update the `tasks` array
        { upsert: false } // ❌ Ensure it doesn't create a new document
    );

    if (result.modifiedCount > 0) {
        revalidatePath("*")
        return true
    }

    return false
}