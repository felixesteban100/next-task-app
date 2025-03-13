"use client"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { cn, getMostRepeatedState, getTotalDoneImportantTasks, getTotalDoneSpiritualTasks } from '@/lib/utils'
import { toast } from "sonner"

import { TIMES } from "@/constants"

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
import { Separator } from "./ui/separator"

export type DailyTaskAndDetails = {
    tasks: Task[],
    date: string
}

const TaskTypesSchema = z.enum(['normal', 'important', 'spiritual'])
const TaskStatesSchema = z.enum(["done", "no done", "job/occupied"]);
const TaskSchema = z.object({
    name: z.string(),
    type: TaskTypesSchema,
    state: TaskStatesSchema,
    time: z.string(),
})

export type Task = z.infer<typeof TaskSchema>
export type TaskTypes = z.infer<typeof TaskTypesSchema>
export type TaskStates = z.infer<typeof TaskStatesSchema>

const formSchema = z.object({
    tasks: z.array(TaskSchema).min(1, "At least one item is required"),
    date: z.string()
})

type FormSchemaType = z.infer<typeof formSchema>;


export default function TaskToEdit({ dayInfo }: { dayInfo: DailyTaskAndDetails }) {
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

    const formTasksChanged = form.formState.isDirty && (JSON.stringify(tasks) !== JSON.stringify(tasksState))

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!formTasksChanged) {
            toast.info("Didn't change anything.", {
                description: date,
            })
            return
        }

        const result = await saveTasksOfCurrentDate(values.date, values.tasks)

        form.reset(values);

        if (result === true) {
            toast.success("Tasks have been saved.", {
                description: date,
            })
        } else {
            toast.error("Tasks didn't save.", {
                description: date,
            })
        }

    }

    function changeTime(taskName: string, newTime: string) {
        const updatedTasks = tasksState.map(task => {
            if (task.name !== taskName) return task
            return { ...task, time: newTime }
        })
        form.setValue("tasks", updatedTasks)
    }

    return (
        <div className='flex flex-col gap-10 items-center mb-10'>
            <div className='flex flex-row gap-10 items-center'>
                <p className='font-bold text-2xl'>{date} (Today)</p>
                <p>Overall: {stateEmoji[getMostRepeatedState(tasksState)]}</p>
                <p>Spiritual {/* 📖🙏⚔🛡✝ */}: {/* {stateEmoji[getMostRepeatedState(tasksState.filter(c => c.type === "spiritual"))]} */} {getTotalDoneSpiritualTasks(tasksState)}</p>
                <p>Important {/* 💻💪🦵😎💡 */}: {/* {stateEmoji[getMostRepeatedState(tasksState.filter(c => c.type === "important"))]} */} {getTotalDoneImportantTasks(tasksState)}</p>
            </div>
            <div className='flex flex-row gap-10 items-center'>
                <p>Done: {doneTasks}</p>
                <p>No Done: {noDoneTasks}</p>
                <p>Job/Occupied: {job_OccupiedTasks}</p>
                <p>Total: {tasks.length}</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 justify-center items-center">
                    <Button disabled={form.formState.isSubmitting || !formTasksChanged} className={`w-fit px-5 `} type="submit">
                        <p className={`${!formTasksChanged ? "" : "animate-bounce"}`}>{form.formState.isSubmitting ? "Saving..." : "Save progress"}</p>
                    </Button>
                    <FormField
                        control={form.control}
                        name="tasks"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xl">Tasks:</FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <div>
                                        {field.value.map((task, index) => (
                                            <div key={task.name + task.time + index} >
                                                {task.name === "Say what you did recently: was it sinful or righteous before God?" ? <Separator className="my-5" /> : null}
                                                <div className="flex gap-2 items-center justify-start">
                                                    <ToggleGroup
                                                        variant={"outline"}
                                                        onValueChange={(e) => {
                                                            if (!e) return; // Early exit if empty
                                                            const [taskToEditName, newValue] = e.split("->");
                                                            if (taskToEditName !== `${task.name}_${task.time}`) return; // Skip unnecessary update
                                                            const updatedItems = field.value.map((item: Task) =>
                                                                `${item.name}_${item.time}` === taskToEditName ? { ...item, state: newValue as TaskStates } : item
                                                            );
                                                            field.onChange(updatedItems); // ✅ Pass the new array directly
                                                        }}
                                                        type="single"
                                                        defaultValue={task.state}
                                                    >
                                                        <ToggleGroupItem value={`${task.name}_${task.time}->done`} className={`${task.state !== "done" ? "grayscale-100" : ""}`}>
                                                            ✅
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem value={`${task.name}_${task.time}->no done`} className={`${task.state !== "no done" ? "grayscale-100" : ""}`}>
                                                            ❌
                                                        </ToggleGroupItem>
                                                        <ToggleGroupItem value={`${task.name}_${task.time}->job/occupied`} className={`${task.state !== "job/occupied" ? "grayscale-100" : ""}`} /* disabled={task.type === "spiritual"} */>
                                                            ☑️
                                                        </ToggleGroupItem>
                                                    </ToggleGroup>
                                                    <p
                                                        className={cn(classNamesType[task.type], classNamesState[task.state])}
                                                    >
                                                        {task.name}
                                                    </p>
                                                    <select defaultValue={task.time} onChange={(e) => changeTime(task.name, e.target.value)}>
                                                        {TIMES.map(time => {
                                                            return <option className="text-foreground bg-background" key={task.name + time} value={time}>{time}</option>
                                                        })}
                                                    </select>
                                                </div>
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

