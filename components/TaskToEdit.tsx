"use client"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { cn } from '@/lib/utils'
import { toast } from "sonner"

// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { TIMES } from "@/constants"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { saveTasksOfCurrentDate } from "@/server/actions"
import { classNamesState, classNamesType, stateEmoji } from "@/constants"
// import { useState } from "react"

const TaskTypes = z.enum(['normal', 'important', 'spiritual'])
const TaskStates = z.enum(["done", "no done", "job/occupied"]);

export type DailyTaskAndDetails = {
    tasks: Task[],
    date: string
}

const TaskSchema = z.object({
    name: z.string(),
    type: TaskTypes,
    state: TaskStates,
    time: z.string(),
})

export type Task = z.infer<typeof TaskSchema>

const formSchema = z.object({
    tasks: z.array(TaskSchema).min(1, "At least one item is required"),
    date: z.string()
})

type FormSchemaType = z.infer<typeof formSchema>;


export default function TaskToEdit({ dayInfo }: { dayInfo: DailyTaskAndDetails }) {
    // const [tasks, setTasks] = useState<Task[]>(defaultTasks)
    // const [loading, setLoading] = useState(false)
    const { tasks, date } = dayInfo

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tasks,
            date
        },
    })

    const { tasks: tasksState } = form.watch();

    const doneTasks = `${stateEmoji["done"]}${tasksState.filter(c => c.state === "done").length}`
    const noDoneTasks = `${stateEmoji["no done"]}${tasksState.filter(c => c.state === "no done").length}`
    const job_OccupiedTasks = `${stateEmoji["job/occupied"]}${tasksState.filter(c => c.state === "job/occupied").length}`

    const haventChangedAnyTasks = JSON.stringify(form.watch("tasks")) === JSON.stringify(tasks)

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // save in mongodb with server actions
        saveTasksOfCurrentDate(values.date, values.tasks)
        toast("Tasks have been saved.", {
            description: date,
            /* action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            }, */
        })
    }

    // turn this functions into mongodb queries 
    function getMostRepeatedState(tasks: Task[]) {
        const frequencyMap = tasks.reduce<Record<string, number>>((acc, item) => {
            acc[item.state] = (acc[item.state] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(frequencyMap).reduce<{ value: typeof TaskStates._type; count: number }>(
            (max, [value, count]) => (count > max.count ? { value: value as typeof TaskStates._type, count } : max),
            { value: "no done", count: 0 }
        ).value;
    };


    function getTotalDoneSpiritualTasks() {
        const spiritualTasks = form.getValues("tasks").filter(c => c.type === "spiritual")
        return `${spiritualTasks.filter(c => c.state === "done").length} / ${spiritualTasks.length}`
    }

    function getTotalDoneImportantTasks() {
        const importantTasks = form.getValues("tasks").filter(c => c.type === "important")
        return `${importantTasks.filter(c => c.state === "done").length} / ${importantTasks.length}`
    }

    return (
        /* this should be a form */
        <div className='flex flex-col gap-10 items-center'>
            {/* this should be immutable data that gets saved into the database and changes depeding on the data of the other info of the tasks */}
            <div className='flex flex-row gap-10 items-center'>
                <p className='font-bold text-2xl'>{date} (Today)</p>
                <p>Overall: {stateEmoji[getMostRepeatedState(tasksState)]}</p>
                <p>Spiritual 📖🙏⚔🛡✝: {stateEmoji[getMostRepeatedState(tasksState.filter(c => c.type === "spiritual"))]} {getTotalDoneSpiritualTasks()}</p>
                <p>Important 💻💪🦵😎💡: {stateEmoji[getMostRepeatedState(tasksState.filter(c => c.type === "important"))]} {getTotalDoneImportantTasks()}</p>
            </div>
            <div className='flex flex-row gap-10 items-center'>
                <p>Done: {doneTasks}</p>
                <p>No Done: {noDoneTasks}</p>
                <p>Job/Occupied: {job_OccupiedTasks}</p>
                <p>Total: {tasks.length}</p>
            </div>
            {/* this should be immutable data that gets saved into the database and changes depeding on the data of the other info of the tasks */}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 justify-center items-center">
                    <Button disabled={haventChangedAnyTasks} className={`w-fit px-5 `} type="submit">
                        <p className={`${haventChangedAnyTasks ? "" : "animate-bounce"}`}>{haventChangedAnyTasks ? "Make some changes" : "Save progress"}</p>
                    </Button>
                    <FormField
                        control={form.control}
                        name="tasks"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tasks</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <div>
                                        {field.value.map(task => (
                                            <div key={task.name + task.time} className="flex gap-2 items-center justify-start">
                                                <ToggleGroup
                                                    variant={"outline"}
                                                    onValueChange={(e) => {
                                                        if (!e) return; // Early exit if empty

                                                        const [taskToEditName, newValue] = e.split("-");

                                                        if (taskToEditName !== task.name) return; // Skip unnecessary update

                                                        // ✅ Update the state and return the new array directly
                                                        const updatedItems = field.value.map((item: Task) =>
                                                            item.name === task.name ? { ...item, state: newValue as typeof TaskStates._type } : item
                                                        );

                                                        field.onChange(updatedItems); // ✅ Pass the new array directly
                                                    }}
                                                    type="single"
                                                    defaultValue={task.state}
                                                >
                                                    <ToggleGroupItem value={`${task.name}-done`} className={`${task.state !== "done" ? "grayscale-100" : ""}`}>
                                                        ✅
                                                    </ToggleGroupItem>
                                                    <ToggleGroupItem value={`${task.name}-no done`} className={`${task.state !== "no done" ? "grayscale-100" : ""}`}>
                                                        ❌
                                                    </ToggleGroupItem>
                                                    <ToggleGroupItem value={`${task.name}-job/occupied`} className={`${task.state !== "job/occupied" ? "grayscale-100" : ""}`} disabled={task.type === "spiritual"}>
                                                        ☑️
                                                    </ToggleGroupItem>
                                                </ToggleGroup>
                                                <p
                                                    className={cn(classNamesType[task.type], classNamesState[task.state])}
                                                >
                                                    {task.name}
                                                </p>
                                                {/* <Select
                                                    onValueChange={(e) => {
                                                        if (e != "") {
                                                            field.onChange((prevItems: Task[]) =>
                                                                prevItems.map((item: Task) =>
                                                                    item.name === task.name ? { ...item, time: e } : item
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    defaultValue={task.time}
                                                >
                                                    <SelectTrigger >
                                                        <SelectValue placeholder={"0:00 am"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {TIMES.map(time => {
                                                            return <SelectItem key={time} value={time}>{time}</SelectItem>
                                                        })}
                                                    </SelectContent>
                                                </Select> */}
                                            </div>
                                        ))}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div >
    )
}
