import { ToWatch } from "@/app/(main)/to-watch/page";
import { ReflectionQuestions } from "@/app/(main)/today/page";
import { DailyTaskAndDetails, Task } from "@/components/TaskToEdit";
import { MongoClient, type Document } from "mongodb";

export function connectToCluster<CollectionType extends Document>(collectionName: string) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(process.env.MONGODB_URI!);
        mongoClient.connect();

        const db = mongoClient.db('Tasks');
        const collection = db.collection<CollectionType>(collectionName);

        return collection
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        throw new Error(`Connection to MongoDB Atlas failed! ${error}`)
    }
}

export const collectionTask = connectToCluster<DailyTaskAndDetails>("Task")
export const collectionDefaultTasks = connectToCluster<{ tasks: Task[] }>("DEFAULT_TASKS")
export const collectionReflectionQuestions = connectToCluster<ReflectionQuestions>("Reflection Questions")
export const collectionToWatch = connectToCluster<ToWatch>("List to watch")

// mongodb-socket.ts
// import { MongoClient, type Document, type ChangeStreamDocument, Collection } from "mongodb";
// import { EventEmitter } from "events";

// export const dbChangeEmitter = new EventEmitter();

// let client: MongoClient | null = null;

// export function connectToCluster<CollectionType extends Document>(
//     collectionName: string
// ): Collection<CollectionType> {
//     if (!client) {
//         client = new MongoClient(process.env.MONGODB_URI!);
//         client.connect().catch((err) => {
//             console.error("MongoDB connection failed:", err);
//             throw new Error("MongoDB connection failed");
//         });
//     }

//     return client.db("Tasks").collection<CollectionType>(collectionName);
// }

// export function watchCollection<CollectionType extends Document>(collectionName: string) {
//     const collection = connectToCluster<CollectionType>(collectionName);
//     const changeStream = collection.watch();

//     changeStream.on("change", (change: ChangeStreamDocument<CollectionType>) => {
//         console.log(`Change detected in ${collectionName}:`, change);
//         dbChangeEmitter.emit(collectionName, change);
//     });

//     return changeStream;
// }

// // Initialize watchers once
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// if (!(globalThis as any)._mongoWatchers) {
//     watchCollection("Task");
//     watchCollection("DEFAULT_TASKS");
//     watchCollection("Reflection Questions");
//     watchCollection("List to watch");
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     (globalThis as any)._mongoWatchers = true;
// }

// // Export collections
// export const collectionTask = connectToCluster("Task");
// export const collectionDefaultTasks = connectToCluster("DEFAULT_TASKS");
// export const collectionReflectionQuestions = connectToCluster("Reflection Questions");
// export const collectionToWatch = connectToCluster("List to watch");
