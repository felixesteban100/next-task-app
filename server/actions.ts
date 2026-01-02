"use server"

import { ToWatch } from "@/app/(main)/to-watch/page"
import { Task } from "@/components/TaskToEdit"
import { collectionDefaultTasks, collectionTask, collectionToWatch } from "@/db/mongodb/mongodb"
// import { getTodaysDate } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { connection } from 'next/server'

export async function addDefaultTasksWithTodaysDate() {
    connection()
    const todayDate = new Date()//getTodaysDate()
    const existingDay = await collectionTask.findOne({ date: todayDate });

    if (existingDay) return false

    const defaultTasks = await collectionDefaultTasks.findOne()

    await collectionTask.insertOne({
        tasks: defaultTasks!.tasks.map((c, i): Task => {
            return { ...c, id: i } as Task
        }),
        date: todayDate
    })
    return true
}

export async function saveTasksOfCurrentDate(date: Date, tasks: Task[]) {
    connection()
    const result = await collectionTask.updateOne(
        { date: new Date(date) },
        { $set: { tasks: tasks } }, // ✅ Use `$set` to update the `tasks` array
        { upsert: false } // ❌ Ensure it doesn't create a new document
    );

    if (result.modifiedCount > 0) {
        revalidatePath("*")
        return true
    }

    return false
}

export async function updateToWatchMedia(name: string, info: ToWatch) {
    connection()

    const result = await collectionToWatch.updateOne(
        { name },
        { $set: info }, // ✅ Use `$set` to update the `tasks` array
        { upsert: false } // ❌ Ensure it doesn't create a new document
    );

    if (result.modifiedCount > 0) {
        revalidatePath("/to-watch")
        return true
    }

    return false
}