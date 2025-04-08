"use client"

// import {
//     ToggleGroup,
//     ToggleGroupItem,
// } from "@/components/ui/toggle-group"
import { cn, filterFutureTimes, getTotalTasksByType } from '@/lib/utils'
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
    FormMessage,
} from "@/components/ui/form"
import { saveTasksOfCurrentDate } from "@/server/actions"
import { classNamesState, classNamesType, stateEmoji } from "@/constants"
import { Separator } from "./ui/separator"
import { Loader2, SaveAll } from "lucide-react"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { MultiStepLoader } from "./acernity-ui/multi-step-loader"
import { useState } from "react"
import { DialogTrigger } from './ui/dialog'
// import { AnimatedTestimonialsDemo } from './animated-testimonials'

const loadingStates = [
    { text: "Client Sends Data to server" },
    { text: "Data is inserted from server into database " },
    { text: "Response is sent back from the server to the client" }
];

export type DailyTaskAndDetails = {
    tasks: Task[],
    date: string
}

const TaskTypesSchema = z.enum(['normal', 'important', 'spiritual'])
const TaskStatesSchema = z.enum(["done", "no done", "occupied"]);
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

const durationLoader = 1000

export default function TaskToEdit({ dayInfo, hourAdded }: { dayInfo: DailyTaskAndDetails, hourAdded: string }) {
    const [loading, setLoading] = useState(false);

    const { tasks, date } = dayInfo

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tasks,
            date
        },
    })

    const { tasks: tasksState } = form.watch();

    const formTasksChanged = form.formState.isDirty && (JSON.stringify(tasks) !== JSON.stringify(tasksState))

    const doneTasks = `${stateEmoji["done"]}${tasksState.filter(c => c.state === "done").length}`
    const noDoneTasks = `${stateEmoji["no done"]}${tasksState.filter(c => c.state === "no done").length}`
    const occupiedTasks = `${stateEmoji["occupied"]}${tasksState.filter(c => c.state === "occupied").length}`

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)

        const result = await saveTasksOfCurrentDate(values.date, values.tasks)
        form.reset(values);

        setTimeout(() => {
            setLoading(false)

            if (result === true) {
                toast.success("Tasks have been saved.", {
                    description: date,
                })
            } else {
                toast.error("Tasks didn't save.", {
                    description: date,
                })
            }
        }, durationLoader * loadingStates.length);
    }

    function updateTask(
        inputValue: string,
        task: Task,
        index: number,
        property: 'time' | 'state',
        fieldOnChange: (value: Task[]) => void
    ) {
        if (!inputValue) return; // Early exit if empty
        const [taskToEditName, newValue] = inputValue.split("->");

        if (taskToEditName !== `${task.name}_${task.time}_${index}`) return; // Skip unnecessary update

        const updatedTasks = tasksState.map((item, indexItem) =>
            `${item.name}_${item.time}_${indexItem}` === taskToEditName
                ? { ...item, [property]: newValue }
                : item
        );

        fieldOnChange(updatedTasks); // ✅ Pass the new array directly
    }


    return (
        <div className='flex flex-col gap-7 items-center mb-10 w-full'>
            <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={durationLoader} loop={false} callbackAfterLoading={() => setLoading(false)} />

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <span className='font-bold text-2xl'>
                            {date} (Today)
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Added at: {hourAdded}</p>
                        <div className='flex flex-col gap-2 items-center text-2xl'>
                            <p>Spiritual: {getTotalTasksByType(tasksState, "spiritual")}</p>
                            <p>Important: {getTotalTasksByType(tasksState, "important")}</p>
                            <p>Normal: {getTotalTasksByType(tasksState, "normal")}</p>
                            <p>Total: {doneTasks} {noDoneTasks} {occupiedTasks}</p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 justify-center">

                    <Button
                        id="saveButton"
                        disabled={form.formState.isSubmitting || !formTasksChanged}
                        className={`group disabled:grayscale-25 w-fit p-7 text-xl fixed bottom-10 left-[65rem] ${form.formState.isSubmitting || !formTasksChanged ? "" : "animate-[pulse_2s_infinite]"}`}
                        type="submit"
                    >
                        <p
                            className={`group-enabled:animate-bounce flex gap-2 items-center`}
                        >
                            {form.formState.isSubmitting ? <>Saving...<Loader2 className="animate-spin" size={120} /></> : <>Save progress<SaveAll className='size-7' /></>}
                        </p>
                        {/* {form.formState.isSubmitting || !formTasksChanged ? null :
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/40 to-transparent"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                />
                            } */}
                    </Button>
                    <FormField
                        control={form.control}
                        name="tasks"
                        render={({ field }) => (
                            <FormItem>
                                <FormMessage />
                                <FormControl>
                                    <div>
                                        {field.value.map((task, index) => (
                                            <div key={task.name + task.time + index} >
                                                {task.name === "Say what you did recently: was it sinful or righteous before God?" ? <Separator className="my-5" /> : null}
                                                {/* {task.name === "Say what you did recently: was it sinful or righteous before God?" && task.time === "8:30 pm" ? <AnimatedTestimonialsDemo /> : null} */}
                                                <div className="flex gap-2 items-center justify-start">
                                                    {Object.entries(stateEmoji).map(([state, emoji]) => (
                                                        <Button
                                                            key={index + state}
                                                            type="button"
                                                            size="icon"
                                                            variant={"ghost"}
                                                            className={`${task.state !== state ? "grayscale-100" : ""}`}
                                                            onClick={() => updateTask(`${task.name}_${task.time}_${index}->${state}`, task, index, "state", field.onChange)}
                                                        >
                                                            {emoji}
                                                        </Button>
                                                    ))}

                                                    {task.name === "🦵 Knee improvement Routine" ?
                                                        <DialogTrigger>
                                                            <p
                                                                className={cn(classNamesType[task.type], classNamesState[task.state], "cursor-pointer font-semibold underline hover:underline-offset-4")}
                                                            >
                                                                {task.name}
                                                            </p>
                                                        </DialogTrigger>
                                                        :
                                                        <p
                                                            className={cn(classNamesType[task.type], classNamesState[task.state])}
                                                        >
                                                            {task.name}
                                                        </p>
                                                    }

                                                    <select
                                                        defaultValue={`${task.name}_${task.time}_${index}->${task.time}`}
                                                        onChange={(e) => updateTask(e.target.value, task, index, "time", field.onChange)}
                                                        className="appearance-none border-none bg-secondary/80 text-foreground rounded-md p-1 "
                                                    >
                                                        {TIMES.map(c => ({ value: `${task.name}_${task.time}_${index}->${c}`, name: c })).map((time) => (
                                                            <option
                                                                key={task.name + time.name}
                                                                value={time.value}
                                                                className={`bg-background ${!filterFutureTimes(TIMES).includes(time.name) ? "text-yellow-500 font-stretch-semi-condensed" : "text-foreground"}`}
                                                            >
                                                                {time.name}{!filterFutureTimes(TIMES).includes(time.name) && "!"}
                                                            </option>
                                                        ))}
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

