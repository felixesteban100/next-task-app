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
import { isAllowedToday } from "@/lib/utils";

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

export async function toggleGodlyTaskOfPreviousDate(date: Date, tasks: Task[]) {
    connection()
    const result = await collectionTask.updateOne(
        { date: date },
        { $set: { tasks: tasks } }, // ✅ Use `$set` to update the `tasks` array
        { upsert: false } // ❌ Ensure it doesn't create a new document
    );

    if (result.modifiedCount > 0) {
        revalidatePath("/previous-days")
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
        recurrence: z.any().optional(), // or better typed recurrence schema
    });

    const raw = {
        title: formData.get("title")?.toString()?.trim() ?? "",
        recurrence: formData.get("recurrence")?.toString(),
    };

    const validated = createTodoSchema.parse(raw);

    const now = new Date();

    await collectionToDoList.insertOne({
        title: validated.title,
        done: false,
        createdAt: now,
        updatedAt: now,
        ...(validated.recurrence && { recurrence: JSON.parse(validated.recurrence) }),
    } satisfies Omit<ToDoTask, "_id">);

    revalidatePath("/todo");

    return { success: true };
}

// /* eslint-disable @typescript-eslint/no-explicit-any */

export async function toggleTodo(
    id: ObjectId,
    intendedDone: boolean,
    actionTime: Date = new Date()
) {
    const objectId = new ObjectId(id);
    console.log(objectId)

    const dayStart = new Date(actionTime);
    dayStart.setHours(0, 0, 0, 0);

    const task = await collectionToDoList.findOne({ _id: objectId });
    if (!task) {
        return { success: false, reason: "not_found", message: "Task not found" };
    }

    const isAllowed = isAllowedToday(task, actionTime);

    // Only allow any change (check or uncheck) if today is a recurrence-allowed day
    if (isAllowed === false) {
        return {
            success: false,
            reason: "recurrence_not_allowed_today",
            message: "This task is not scheduled for today, backend prevented the update."
        };
    }

    // If we reach here → today is allowed → perform the update
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const updateOps: any = {
        $set: {
            done: intendedDone,
            updatedAt: actionTime,
        },
    };

    if (intendedDone) {
        updateOps.$set.lastCompletedAt = actionTime;
        updateOps.$addToSet = { completionHistory: dayStart }; // day-level
    } else {
        updateOps.$pull = { completionHistory: dayStart };

        const history = (task.completionHistory ?? [])
            .filter((d: Date) => d.getTime() !== dayStart.getTime());

        if (history.length > 0) {
            const latest = history.reduce((a: Date, b: Date) => (b > a ? b : a));
            updateOps.$set.lastCompletedAt = latest;
        } else {
            updateOps.$unset = { lastCompletedAt: "" };
        }
    }

    const result = await collectionToDoList.updateOne(
        { _id: objectId },
        updateOps
    );

    revalidatePath("/todo");

    return {
        success: result.modifiedCount > 0,
        reason: "updated",
        modifiedCount: result.modifiedCount
    };
}

export async function deleteTodo(id: ObjectId) {
    await collectionToDoList.deleteOne({ _id: new ObjectId(id) });
    revalidatePath("/todo");
}