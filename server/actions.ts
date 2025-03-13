"use server"

import { Task } from "@/components/TaskToEdit"
import { DEFAULT_TASKS } from "@/constants"
import { collectionTask } from "@/db/mongodb/mongodb"
import { getTodaysDate } from "@/lib/utils"
import { revalidatePath } from "next/cache"

export async function addDefaultTasksWithTodaysDate() {
    const tasks = await collectionTask.insertOne({ tasks: DEFAULT_TASKS, date: getTodaysDate() })
    return tasks
}

export async function saveTasksOfCurrentDate(date: string, tasks: Task[]) {
    const result = await collectionTask.updateOne(
        { date },
        { $set: { tasks: tasks } }, // ✅ Use `$set` to update the `tasks` array
        { upsert: false } // ❌ Ensure it doesn't create a new document
    );

    if (result.modifiedCount > 0) {
        revalidatePath("/")
        return true
    }

    return false
}