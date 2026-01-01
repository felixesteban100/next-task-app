
import { MongoClient } from 'mongodb';
declare global {
    declare type Task = {
        name: string,
        type: 'normal' | 'important' | 'spiritual',
        state: "done" | "no done" | "occupied",
    }


}

declare global {
    // eslint-disable-next-line no-var
    var _mongoClient: MongoClient | undefined;
}

declare module "*.mp3" {
    const src: string;
    export default src;
}