

/* make this page store in mongodb some todo tasks that are once or not daily */
/* make this page be able to show the tasks in ceirtain days in a loop and if not done to show again tommorrow or in the days allowed, tasks like: go to barber shop, cutting nails, cleaning glasses, ... */

import TodoList from "@/components/TodoList";
import { collectionToDoList } from "@/db/mongodb/mongodb";

/* add organize the verses to memorize in bookmars in opera gx */
/* add organize all the proverbs by topics */
/* add the appoiment I have with the doctor in Lahey Medical center in May something 2026*/


// all of this is based on: https://grok.com/c/d4c94acc-e3df-4a13-8bc5-e021efa16628?rid=3a8da54c-0762-455f-bf2d-ff5733ac83a9

export default async function page() {
    const initialTodos = await collectionToDoList.find({}).sort({ updatedAt: -1 }).toArray();

    return (
        <TodoList initialTodos={JSON.parse(JSON.stringify(initialTodos))} />
    )
}
