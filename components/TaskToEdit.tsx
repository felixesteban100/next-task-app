"use client"

// import {
//     ToggleGroup,
//     ToggleGroupItem,
// } from "@/components/ui/toggle-group"
import { cn, filterFutureTimes, getTotalTasksByType, sortByProperty } from '@/lib/utils'
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
// import { DialogTrigger } from './ui/dialog'
// import { AnimatedTestimonialsDemo } from './animated-testimonials'
import { useSearchParams } from 'next/navigation'
import ButtonOrganizeByTime from './ButtonOrganizeByTime'

import { AnimatePresence, motion } from "framer-motion";
import ButtonHideOccupied from './ButtonHideOccupied'

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
    id: z.number()
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

export default function TaskToEdit({ dayInfo, hourAdded, hideOccupied }: { dayInfo: DailyTaskAndDetails, hourAdded: string, hideOccupied: boolean }) {
    const organizeByTime = new URLSearchParams(useSearchParams()).get('organizeByTime') === "true" ? true : false

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

    const formTasksChanged = form.formState.isDirty && (JSON.stringify(tasks.sort((a, b) => a.id - b.id)) !== JSON.stringify(tasksState.sort((a, b) => a.id - b.id)))

    const doneTasks = `${stateEmoji["done"]}${tasksState.filter(c => c.state === "done").length}`
    const noDoneTasks = `${stateEmoji["no done"]}${tasksState.filter(c => c.state === "no done").length}`
    const occupiedTasks = `${stateEmoji["occupied"]}${tasksState.filter(c => c.state === "occupied").length}`

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        document.body.classList.add('overflow-hidden'); // disable scroll

        const result = await saveTasksOfCurrentDate(values.date, values.tasks)
        form.reset(values);

        setTimeout(() => {
            setLoading(false)
            document.body.classList.remove('overflow-hidden'); // enable scroll

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
                ? { ...item, [property]: newValue, }
                : item
        );

        // fieldOnChange(updatedTasks); // ✅ Pass the new array directly
        fieldOnChange(sortByProperty(updatedTasks, "id")); // ✅ Pass the new array directly
    }

    return (
        <div className={`flex flex-col gap-7 items-center mb-10 w-full `}>
            <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={durationLoader} loop={false} callbackAfterLoading={() => setLoading(false)} />

            <div className='flex flex-col gap-5 items-center justify-between w-full'>
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
                <div className='flex gap-5'>
                    <ButtonOrganizeByTime />
                    <ButtonHideOccupied />
                </div>
            </div>


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 justify-center">
                    <div className='fixed bottom-10 left-10/12 -translate-x-10/12 flex gap-5'>
                        <Button
                            id="saveButton"
                            disabled={form.formState.isSubmitting || !formTasksChanged}
                            className={`group disabled:grayscale-25 p-7 text-xl   ${/* form.formState.isSubmitting || !formTasksChanged ? "" : "animate-[pulse_2s_infinite]" */""}`}
                            type="submit"
                        >
                            <p
                                className={`group-enabled:animate-bounce flex gap-2 items-center`}
                            >
                                {form.formState.isSubmitting ? <>Saving...<Loader2 className="animate-spin" size={120} /></> : <>Save progress<SaveAll className='size-7' /></>}
                            </p>
                        </Button>
                    </div>
                    <FormField
                        control={form.control}
                        name="tasks"
                        render={({ field }) => (
                            <FormItem>
                                <FormMessage />
                                <FormControl>
                                    <div>
                                        {(sortByProperty(field.value, organizeByTime ? "time" : "id")).map((task) => {
                                            const occupiedAndNotSpiritual = task.state === "occupied" && task.type !== "spiritual"
                                            return (
                                                <AnimatePresence key={task.name + task.time + task.id}>
                                                    {/* <div */}
                                                    <motion.div
                                                        transition={{
                                                            type: "spring",
                                                            damping: 20,
                                                            stiffness: 300
                                                        }}
                                                        layout
                                                        key={task.name + task.time + task.id}
                                                    >
                                                        {task.name === "Battle Prayer ⚔🛡 and thanksgiving 🙏" ? <Separator className="my-5" /> : null}
                                                        <div className="flex gap-2 items-center justify-start group">
                                                            {Object.entries(stateEmoji).map(([state, emoji]) => (
                                                                <Button
                                                                    key={task.id + state}
                                                                    type="button"
                                                                    size="icon"
                                                                    variant={"ghost"}
                                                                    className={`${task.state !== state ? "grayscale-100" : ""}`}
                                                                    onClick={() => updateTask(`${task.name}_${task.time}_${task.id}->${state}`, task, task.id, "state", field.onChange)}
                                                                >
                                                                    {emoji}
                                                                </Button>
                                                            ))}

                                                            <p
                                                                className={cn(occupiedAndNotSpiritual ? null : `${classNamesType[task.type]} `, classNamesState[task.state])}
                                                            >
                                                                {occupiedAndNotSpiritual && hideOccupied ?
                                                                    <>
                                                                        <span className='group-hover:hidden block'>{"Either Working or occupied..."}</span>
                                                                        <span className='hidden group-hover:block'>{task.name}</span>
                                                                    </>
                                                                    : task.name}
                                                            </p>

                                                            <select
                                                                defaultValue={`${task.name}_${task.time}_${task.id}->${task.time}`}
                                                                onChange={(e) => updateTask(e.target.value, task, task.id, "time", field.onChange)}
                                                                className="appearance-none border-none bg-secondary/80 text-foreground rounded-md p-1 "
                                                            >
                                                                {TIMES.map(c => ({ value: `${task.name}_${task.time}_${task.id}->${c}`, name: c })).map((time) => (
                                                                    <option
                                                                        key={task.name + time.name}
                                                                        value={time.value}
                                                                        className={`bg-background ${!filterFutureTimes(TIMES).includes(time.name) ? "text-red-300 font-stretch-semi-condensed" : "text-foreground"}`}
                                                                    >
                                                                        {time.name}{!filterFutureTimes(TIMES).includes(time.name) && "!"}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </motion.div>
                                                    {/* </div> */}
                                                </AnimatePresence>
                                            )
                                        })}
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

