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
    revalidatePath("/today")
    revalidatePath("/previous-days")
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
        revalidatePath("/today")
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
// export async function createTodo(formData: FormData) {
//     const todoSchema = z.object({
//         title: z.string().min(1).max(200),
//         type: z.enum(["once", "daily", "weekly", "custom"]),
//     });

//     const raw = {
//         title: formData.get("title")?.toString() ?? "",
//         type: formData.get("type")?.toString() ?? "once",
//     };

//     const recurrenceStr = formData.get("recurrence")?.toString();

//   const recurrence = recurrenceStr ? JSON.parse(recurrenceStr) : { frequency: "once" };

//     const validated = todoSchema.parse(raw);

//     // @ts-expect-error _id will be auto-generated
//     await collectionToDoList.insertOne({
//         ...validated,
//         done: false,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     recurrence,
//     } satisfies Omit<ToDoTask, "_id">);

//     revalidatePath("/todos");
//     return { success: true };
// }

export async function createTodo(formData: FormData) {
    const createTodoSchema = z.object({
        title: z.string().min(1, "Title is required"),
        type: z.enum(["once", "daily", "weekly", "monthly", "yearly"]),
        recurrence: z.any().optional(), // or better typed recurrence schema
    });

    const raw = {
        title: formData.get("title")?.toString()?.trim() ?? "",
        type: formData.get("type")?.toString() ?? "once",
        recurrence: formData.get("recurrence")?.toString(),
    };

    const validated = createTodoSchema.parse(raw);

    const now = new Date();

    await collectionToDoList.insertOne({
        title: validated.title,
        type: validated.type,
        done: false,
        createdAt: now,
        updatedAt: now,
        ...(validated.recurrence && { recurrence: JSON.parse(validated.recurrence) }),
    } satisfies Omit<ToDoTask, "_id">);

    revalidatePath("/todo");

    return { success: true };
}

export async function toggleTodo(id: ObjectId, shouldBeDone: boolean, actionTime: Date) {
    // Normalize to start of day for completion tracking
    const dayStart = new Date(actionTime);
    dayStart.setHours(0, 0, 0, 0);

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const updateOps: any = {
        $set: {
            done: shouldBeDone,
            updatedAt: actionTime,      // always update when user interacts
        },
    };

    if (shouldBeDone) {
        updateOps.$set.lastCompletedAt = actionTime; // full time for display
        updateOps.$addToSet = { completionHistory: dayStart }; // day-level
    } else {
        updateOps.$pull = { completionHistory: dayStart };

        const task = await collectionToDoList.findOne({ _id: new ObjectId(id) });

        if (task) {
            // Remaining days (start-of-day Dates)
            const remainingDays = (task.completionHistory ?? [])
                .filter((d: Date) => d.getTime() !== dayStart.getTime());

            if (remainingDays.length > 0) {
                // Most recent day
                const latestDay = remainingDays.reduce((prev, curr) =>
                    curr > prev ? curr : prev
                );
                // Set lastCompletedAt to start of that day (or keep full time if you want)
                updateOps.$set.lastCompletedAt = latestDay;
            } else {
                updateOps.$unset = { lastCompletedAt: "" };
            }
        } else {
            updateOps.$unset = { lastCompletedAt: "" };
        }
    }

    await collectionToDoList.updateOne(
        { _id: new ObjectId(id) },
        updateOps
    );

    revalidatePath("/todo");
}

export async function deleteTodo(id: ObjectId) {
    await collectionToDoList.deleteOne({ _id: new ObjectId(id) });
    revalidatePath("/todo");
}