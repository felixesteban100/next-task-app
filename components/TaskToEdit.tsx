"use client"

// import {
//     ToggleGroup,
//     ToggleGroupItem,
// } from "@/components/ui/toggle-group"
import { cn, DateString, filterFutureTimes, getTotalTasksByType, sortByProperty } from '@/lib/utils'
import { toast } from "sonner"

import { GODLY_TASKS, TASKS_THAT_DONT_SEPARATE_SECTIONS, TASKS_THAT_SEPARATE_SECTIONS, TIMES } from "@/constants"

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
import { useState,/*  useEffect  */ } from "react"

// import { io } from 'socket.io-client';

// import { DialogTrigger } from './ui/dialog'
// import { AnimatedTestimonialsDemo } from './animated-testimonials'
import ButtonOrganizeByTime from './ButtonOrganizeByTime'

import { AnimatePresence, motion } from "framer-motion";
import ButtonHideOccupied from './ButtonHideOccupied'
import ButtonTogglePreviousTasks from './ButtonTogglePreviousTasks'
import { useTabAndInactivityRedirect } from '@/lib/useTabAndInactivityRedirect'

const loadingStates = [
    { text: "Client Sends Data to server" },
    { text: "Data is inserted from server into database " },
    { text: "Response is sent back from the server to the client" }
];

export type DailyTaskAndDetails = {
    tasks: Task[],
    date: Date
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
    // date: z.date()
})

type FormSchemaType = z.infer<typeof formSchema>;

const durationLoader = 1000

export default function TaskToEdit({ dayInfo, hourAdded, organizeByTime, hideOccupied, togglePreviousTasks }: { dayInfo: DailyTaskAndDetails, hourAdded: string, organizeByTime: boolean, hideOccupied: boolean, togglePreviousTasks: boolean }) {
    const [loading, setLoading] = useState(false);

    const { tasks, date } = dayInfo

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tasks
        },
    })

    useTabAndInactivityRedirect({
        inactivityTimeoutMs: 2 * 60 * 1000,   // 2 minutes
        redirectTo: '/',                      // or '/login', '/home', etc.
        enabled: true,
        showCountdown: true,                  // optional
    });

    // At component top level
    // const [justSaved, setJustSaved] = useState(false)

    /* useEffect(() => {
        let source: EventSource;
        let reconnectAttempts = 0;
        const maxReconnects = 5;  // Prevent infinite loops

        const connect = () => {
            source = new EventSource('/api/live-tasks');

            source.onopen = () => {
                console.log('SSE connected');
                reconnectAttempts = 0;  // Reset on success
            };

            source.onmessage = (event) => {
                console.log('SSE message received:', event.data);
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'ping' || data.type === 'heartbeat') return;

                    // Your existing logic (check justSaved, toast, refresh if not own change)
                    try {
                        const data = JSON.parse(event.data)
                        if (data.type === 'ping' || data.type === 'heartbeat') return;

                        if (justSaved) {
                            setJustSaved(false)
                            toast.success("Changes saved successfully!")
                            return
                        }

                        // Change from another source → refresh this tab
                        toast.info("Data changed elsewhere → refreshing...")
                        setTimeout(() => {
                            window.location.reload()
                        }, 800)

                    } catch (err) {
                        console.error('SSE parse error:', err)
                    }
                } catch (err) {
                    console.error('SSE parse error:', err);
                }
            };

            source.onerror = (err) => {
                console.error('SSE error:', err);
                source.close();
                if (reconnectAttempts < maxReconnects) {
                    reconnectAttempts++;
                    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);  // Exponential backoff, max 30s
                    console.log(`Reconnecting in ${delay / 1000}s... (attempt ${reconnectAttempts})`);
                    setTimeout(connect, delay);
                } else {
                    toast.error("Real-time updates failed. Please refresh manually.");
                }
            };
        };

        connect();

        return () => {
            source?.close();
        };
    }, [justSaved]); */

    /* useEffect(() => {
        const scheduleRefresh = () => {
            const now = new Date()
            const today21 = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                21, 0, 0, 0
            )

            // If we're already past 21:00 today → refresh immediately
            if (now >= today21) {
                window.location.reload()
                return
            }

            // Otherwise schedule refresh for tonight 21:00
            const msUntil21 = today21.getTime() - now.getTime()

            const timeout = setTimeout(() => {
                window.location.reload()
            }, msUntil21)

            return () => clearTimeout(timeout)
        }

        const cleanup = scheduleRefresh()

        // In case user keeps tab open multiple days
        const nextDayCheck = setInterval(scheduleRefresh, 24 * 60 * 60 * 1000)

        return () => {
            cleanup?.()
            clearInterval(nextDayCheck)
        }
    }, []) */

    // last used 
    // and I need to know if I really need auto refresh when db changes 
    // useEffect(() => {
    //     // Only poll if the tab is visible (saves resources when minimized/background)
    //     const handleVisibilityChange = () => {
    //         if (document.visibilityState === 'visible') {
    //             fetchLatestTasks();
    //         }
    //     };

    //     const fetchLatestTasks = async () => {
    //         try {
    //             // Adjust URL if your initial tasks come from a different endpoint
    //             // This assumes you have a GET route that returns { tasks, date } or similar
    //             // If not, create a simple /api/tasks?date=... route that queries MongoDB
    //             const res = await fetch(`/api/live-tasks?date=${new Date(date).toISOString()}`, {
    //                 cache: 'no-store', // or use revalidate if you add ISR later
    //             });

    //             if (!res.ok) throw new Error('Failed to fetch tasks');

    //             const updatedData = await res.json(); // Expect { tasks: Task[] }

    //             // Update form with fresh tasks (preserves your form state)
    //             form.reset({ tasks: updatedData.tasks });

    //             // Optional: If date changed server-side, handle it
    //             // if (updatedData.date) { /* update local date if needed */ }
    //         } catch (err) {
    //             console.error('Polling fetch error:', err);
    //             // Optional: toast.error("Couldn't refresh tasks. Try manually refreshing.");
    //         }
    //     };

    //     // Initial fetch on mount (in case initial prop is stale)
    //     fetchLatestTasks();

    //     // Poll every 30 seconds (adjust to 60s if you want even lower usage)
    //     const interval = setInterval(() => {
    //         if (document.visibilityState === 'visible') {
    //             fetchLatestTasks();
    //         }
    //     }, 30000);

    //     // Listen for tab focus/visibility
    //     document.addEventListener('visibilitychange', handleVisibilityChange);

    //     return () => {
    //         clearInterval(interval);
    //         document.removeEventListener('visibilitychange', handleVisibilityChange);
    //     };
    // }, [date, form]); // Re-run if date changes

    const { tasks: tasksState } = form.watch();

    const formTasksChanged = form.formState.isDirty && (JSON.stringify(tasks.sort((a, b) => a.id - b.id)) !== JSON.stringify(tasksState.sort((a, b) => a.id - b.id)))

    const doneTasks = `${stateEmoji["done"]}${tasksState.filter(c => c.state === "done").length}`
    const noDoneTasks = `${stateEmoji["no done"]}${tasksState.filter(c => c.state === "no done").length}`
    const occupiedTasks = `${stateEmoji["occupied"]}${tasksState.filter(c => c.state === "occupied").length}`

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // setJustSaved(true)
        setLoading(true)
        document.body.classList.add('overflow-hidden'); // disable scroll

        const result = await saveTasksOfCurrentDate(date, values.tasks)
        form.reset(values);

        setTimeout(() => {
            setLoading(false)
            document.body.classList.remove('overflow-hidden'); // enable scroll

            if (result === true) {
                toast.success("Tasks have been saved.", {
                    description: DateString(new Date(date))
                })
            } else {
                toast.error("Tasks didn't save.", {
                    description: DateString(new Date(date)),
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

        if (taskToEditName !== `${task.name}_${task.time}_${index}`) return; // Skip unnecessary updat

        const updatedTasks = tasksState.map((item, indexItem) =>
            `${item.name}_${item.time}_${indexItem}` === taskToEditName
                ? { ...item, [property]: newValue, }
                : item
        );
        // fieldOnChange(updatedTasks); // ✅ Pass the new array directly
        fieldOnChange(sortByProperty(updatedTasks, "id")); // ✅ Pass the new array directly
    }

    return (
        <div className={`flex flex-col gap-7 items-center mb-2 w-full `}>
            <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={durationLoader} loop={false} callbackAfterLoading={() => setLoading(false)} />

            <div className='flex flex-col gap-5 items-center justify-between w-full'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <span className='font-bold text-2xl'>
                                (Today) {DateString(new Date(date))}
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
                    <ButtonTogglePreviousTasks />
                    <ButtonHideOccupied />
                </div>
                {togglePreviousTasks ? (
                    <p className='text-sm italic'>Previous tasks are hidden</p>
                ) : null}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 justify-center">
                    <FormField
                        control={form.control}
                        name="tasks"
                        render={({ field }) => (
                            <FormItem>
                                <FormMessage />
                                <FormControl>
                                    <div className='space-y-15 md:space-y-0'>
                                        {(
                                            togglePreviousTasks ?
                                                (sortByProperty(field.value, organizeByTime ? "time" : "id")).filter(task => filterFutureTimes(TIMES).includes(task.time))
                                                : (sortByProperty(field.value, organizeByTime ? "time" : "id"))
                                        ).map((task) => {
                                            const occupiedAndNotSpiritual = task.state === "occupied" && task.type !== "spiritual"

                                            return (
                                                <AnimatePresence key={task.name + task.time + task.id}>
                                                    <motion.div
                                                        transition={{
                                                            type: "spring",
                                                            damping: 20,
                                                            stiffness: 300
                                                        }}
                                                        layout
                                                        key={task.name + task.time + task.id}
                                                    >
                                                        {task.name.includes(TASKS_THAT_SEPARATE_SECTIONS) && task.name !== TASKS_THAT_DONT_SEPARATE_SECTIONS ? <Separator className="my-5" /> : null}
                                                        <div className="flex gap-2 items-center justify-start group">
                                                            <div className='flex flex-col md:flex-row md:gap-2 items-center justify-start '>
                                                                {Object.entries(stateEmoji).map(([state, emoji]) => {
                                                                    if (GODLY_TASKS.includes(task.name) && state === "occupied") return (<Button disabled type="button" size="icon"
                                                                        variant={"ghost"} key={task.id + state}></Button>)
                                                                    return (
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
                                                                    )
                                                                })}
                                                            </div>

                                                            <p
                                                                className={cn(occupiedAndNotSpiritual ? null : `${classNamesType[task.type]} `, classNamesState[task.state], "max-w-[220px] lg:max-w-full ")}
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
                                                                className={`appearance-none border-none bg-secondary/80 ${GODLY_TASKS.includes(task.name) ? "text-foreground/50 cursor-not-allowed" : "text-foreground"}  rounded-md p-1`}
                                                                disabled={GODLY_TASKS.includes(task.name)}
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
                                                </AnimatePresence>
                                            )
                                        })}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
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
                </form>
            </Form>

            {/* {
                !filterFutureTimes(TIMES).length ?
                    (
                        <p>Day is over. <span className='font-medium'>Trust God and live</span></p>
                    )
                    :
                    (
                        
                    )
            } */}
        </div>
    )
}

