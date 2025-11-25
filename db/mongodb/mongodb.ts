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