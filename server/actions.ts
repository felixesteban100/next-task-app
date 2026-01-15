"use server"

import { ToWatch } from "@/app/(main)/to-watch/page"
import { Task } from "@/components/TaskToEdit"
import { z } from "zod";
import { collectionDefaultTasks, collectionTask, collectionToWatch, collectionToDoList } from "@/db/mongodb/mongodb"
// import { getTodaysDate } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { connection } from 'next/server'
import { ToDoTask } from "@/components/TodoList";
import { ObjectId } from "mongodb";

export async function addDefaultTasksWithTodaysDate() {
    connection()
    // Get current time in Eastern Time (Massachusetts)
    const easternTime = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
    });

    const todayEastern = new Date(easternTime);
    todayEastern.setHours(0, 0, 0, 0);  // midnight in Eastern Time

    // Convert back to UTC Date object for MongoDB
    const todayDate = new Date(todayEastern);
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


// TODOS ACTIONS
export async function createTodo(formData: FormData) {
    const todoSchema = z.object({
        title: z.string().min(1).max(200),
        type: z.enum(["once", "daily", "weekly", "custom"]),
    });

    const raw = {
        title: formData.get("title")?.toString() ?? "",
        type: formData.get("type")?.toString() ?? "once",
    };

    const validated = todoSchema.parse(raw);

    // @ts-expect-error _id will be auto-generated
    await collectionToDoList.insertOne({
        ...validated,
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    } satisfies Omit<ToDoTask, "_id">);

    revalidatePath("/todos");
    return { success: true };
}

export async function toggleTodo(id: ObjectId, done: boolean) {
    await collectionToDoList.updateOne(
        { _id: new ObjectId(id) },
        { $set: { done: done, updatedAt: new Date() } }
    );

    revalidatePath("/todos");
}

export async function deleteTodo(id: ObjectId) {
    await collectionToDoList.deleteOne({ _id: new ObjectId(id) });
    revalidatePath("/todos");
}