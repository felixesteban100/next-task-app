// import { ToWatch } from "@/app/(main)/to-watch/page";
// import { ReflectionQuestions } from "@/app/(main)/today/page";
// import { DailyTaskAndDetails, Task } from "@/components/TaskToEdit";
// import { MongoClient, type Document } from "mongodb";

// export function connectToCluster<CollectionType extends Document>(collectionName: string) {
//     let mongoClient;

//     try {
//         mongoClient = new MongoClient(process.env.MONGODB_URI!);
//         mongoClient.connect();

//         const db = mongoClient.db('Tasks');
//         const collection = db.collection<CollectionType>(collectionName);

//         return collection
//     } catch (error) {
//         console.error('Connection to MongoDB Atlas failed!', error);
//         throw new Error(`Connection to MongoDB Atlas failed! ${error}`)
//     }
// }

// export const collectionTask = connectToCluster<DailyTaskAndDetails>("Task")
// export const collectionDefaultTasks = connectToCluster<{ tasks: Task[] }>("DEFAULT_TASKS")
// export const collectionReflectionQuestions = connectToCluster<ReflectionQuestions>("Reflection Questions")
// export const collectionToWatch = connectToCluster<ToWatch>("List to watch")
// // 

// lib/mongodb.ts
import { DailyTaskAndDetails, Task } from "@/components/TaskToEdit";
import { ReflectionQuestions } from "@/app/(main)/today/page";
import { ToWatch } from "@/app/(main)/to-watch/page";
// lib/mongodb.ts (or wherever you keep it)
import { MongoClient } from 'mongodb';
import { ToDoTask } from "@/components/TodoList";
import { Thanksgivings } from "@/app/(main)/thanksgivings/page";

if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGODB_URI environment variable');
}

const uri = process.env.MONGODB_URI;

let client: MongoClient;

// In development → use global to survive hot-reloads
if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClient) {
        client = new MongoClient(uri, {
            maxPoolSize: 10,
            // you can add other options here
        });

        // Connect once and store
        global._mongoClient = client;
    }
    client = global._mongoClient!;
} else {
    // Production: fresh client per instance (serverless is fine)
    client = new MongoClient(uri, {
        maxPoolSize: 10,
    });
}

// Optional: you can await client.connect() here if you want eager connection
// but most people connect lazily when first used

export const db = client.db('Tasks');

// Export your collections (safe because client is now always defined)
export const collectionTask = db.collection<DailyTaskAndDetails>('Task');
export const collectionDefaultTasks = db.collection<{ tasks: Task[] }>('DEFAULT_TASKS');
export const collectionReflectionQuestions = db.collection<ReflectionQuestions>('Reflection Questions');
export const collectionToWatch = db.collection<ToWatch>('List to watch');
export const collectionThingsToWatchAtNight = db.collection<{ resources: { name: string, url: string }[] }>('ThingsToWatchAtNight');
export const collectionToDoList = db.collection<ToDoTask>('To do list');
export const collectionThanksgivings = db.collection<Thanksgivings>('Personal Thanksgivings');