"use client"

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

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { MultiStepLoader } from "./acernity-ui/multi-step-loader"
import { useState, useEffect } from "react"

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
})

type FormSchemaType = z.infer<typeof formSchema>;

const durationLoader = 1000

export default function TaskToEdit({ dayInfo, hourAdded, organizeByTime, hideOccupied, togglePreviousTasks }: { dayInfo: DailyTaskAndDetails, hourAdded: string, organizeByTime: boolean, hideOccupied: boolean, togglePreviousTasks: boolean }) {
    const [loading, setLoading] = useState(false);
    const [showDiscardDialog, setShowDiscardDialog] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null);

    const { tasks, date } = dayInfo

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tasks
        },
    })



    const { tasks: tasksState } = form.watch();

    const formTasksChanged = form.formState.isDirty && (JSON.stringify(tasks.sort((a, b) => a.id - b.id)) !== JSON.stringify(tasksState.sort((a, b) => a.id - b.id)))

    // Prevent browser tab close/refresh when there are unsaved changes
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (formTasksChanged) {
                e.preventDefault();
                e.returnValue = ''; // Required for Chrome
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [formTasksChanged]);

    // Intercept ALL navigation attempts (links, buttons, router.push, etc.)
    useEffect(() => {
        if (!formTasksChanged) return;

        // Handle regular link clicks
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a, button');

            // Skip if it's the save button or if there are no unsaved changes
            if (!link || link.id === 'saveButton') return;

            // Check if this is a navigation element
            const isNavigationLink = link.tagName === 'A' ||
                link.hasAttribute('data-navigation') ||
                link.className.includes('navigation') ||
                link.textContent?.includes('Back') ||
                link.textContent?.includes('Home');

            if (isNavigationLink) {
                e.preventDefault();
                e.stopPropagation();

                // Store the navigation action
                if (link.tagName === 'A') {
                    const href = (link as HTMLAnchorElement).href;
                    setPendingNavigation(() => () => {
                        window.location.href = href;
                    });
                } else {
                    // For buttons, trigger their click after confirmation
                    setPendingNavigation(() => () => {
                        // Temporarily disable the check
                        const clickEvent = new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                        link.dispatchEvent(clickEvent);
                    });
                }

                setShowDiscardDialog(true);
            }
        };

        // Handle browser back/forward buttons
        const handlePopState = (e: PopStateEvent) => {
            e.preventDefault();
            history.pushState(null, '', window.location.href); // Prevent navigation

            setPendingNavigation(() => () => {
                history.back();
            });
            setShowDiscardDialog(true);
        };

        // Push current state to enable popstate detection
        history.pushState(null, '', window.location.href);

        document.addEventListener('click', handleClick, true);
        window.addEventListener('popstate', handlePopState);

        return () => {
            document.removeEventListener('click', handleClick, true);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [formTasksChanged]);

    const handleDiscardChanges = () => {
        if (pendingNavigation) {
            // Temporarily reset form state to allow navigation
            form.reset(form.getValues());
            setTimeout(() => {
                pendingNavigation();
            }, 0);
        }
        setShowDiscardDialog(false);
        setPendingNavigation(null);
    };

    const handleCancelDiscard = () => {
        setShowDiscardDialog(false);
        setPendingNavigation(null);
    };

    useTabAndInactivityRedirect({
        inactivityTimeoutMs: 2 * 60 * 1000,
        redirectTo: '/',
        enabled: true,
        disabled: false,//form.formState.isDirty || formTasksChanged,  // ← pause when unsaved changes
        onBeforeRedirect: async () => {
            // Only save if there are actually changes
            if (form.formState.isDirty || formTasksChanged) {
                toast.loading("Auto-saving before leaving...", { id: "auto-save" });

                try {
                    await form.handleSubmit(async (values) => {
                        await saveTasksOfCurrentDate(date, values.tasks);
                        form.reset(values);  // Clear dirty state after save
                        toast.success("Auto-saved successfully", { id: "auto-save" });
                    })();
                } catch (err) {
                    toast.error("Auto-save failed — changes may be lost", { id: "auto-save" });
                    console.log(err)
                    // Optional: prevent redirect if save fails?
                    // throw err; // ← if you want to stop redirect on save failure
                }
            }
        },
    });

    const doneTasks = `${stateEmoji["done"]}${tasksState.filter(c => c.state === "done").length}`
    const noDoneTasks = `${stateEmoji["no done"]}${tasksState.filter(c => c.state === "no done").length}`
    const occupiedTasks = `${stateEmoji["occupied"]}${tasksState.filter(c => c.state === "occupied").length}`

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true)
        document.body.classList.add('overflow-hidden');

        const result = await saveTasksOfCurrentDate(date, values.tasks)
        form.reset(values);

        setTimeout(() => {
            setLoading(false)
            document.body.classList.remove('overflow-hidden');

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

    // function updateTask(
    //     inputValue: string,
    //     task: Task,
    //     index: number,
    //     property: 'time' | 'state',
    //     fieldOnChange: (value: Task[]) => void
    // ) {
    //     if (!inputValue) return;

    //     const [taskToEditName, newValue] = inputValue.split("->");

    //     if (taskToEditName !== `${task.name}_${task.time}_${index}`) return;

    //     const updatedTasks = tasksState.map((item, indexItem) =>
    //         `${item.name}_${item.time}_${indexItem}` === taskToEditName
    //             ? { ...item, [property]: newValue, }
    //             : item
    //     );
    //     fieldOnChange(sortByProperty(updatedTasks, "id"));
    // }

    function updateTask(
        inputValue: string,
        task: Task,
        index: number,
        property: 'time' | 'state',
        fieldOnChange: (value: Task[]) => void
    ) {
        if (!inputValue) return;

        const [taskToEditName, newValue] = inputValue.split("->");
        if (taskToEditName !== `${task.name}_${task.time}_${index}`) return;

        const getMinutes = (timeStr: string) => {
            const [time, period] = timeStr.split(' ');
            const [h, m] = time.split(':').map(Number);
            const h24 = period === 'pm' && h !== 12 ? h + 12 : period === 'am' && h === 12 ? 0 : h;
            return h24 * 60 + m;
        };

        const updatedTasks = tasksState.map((item, indexItem) => {
            if (`${item.name}_${item.time}_${indexItem}` !== taskToEditName) return item;

            if (property === 'state' && newValue === 'done') {
                const now = new Date();
                const currentMinutes = now.getHours() * 60 + now.getMinutes();
                const closestTime = TIMES.reduce((a, b) => Math.abs(currentMinutes - getMinutes(b)) < Math.abs(currentMinutes - getMinutes(a)) ? b : a);
                return { ...item, state: newValue as "done" | "no done" | "occupied", time: closestTime };
            }
            return { ...item, [property]: newValue };
        });

        fieldOnChange(sortByProperty(updatedTasks, "id"));
    }

    return (
        <div className={`flex flex-col gap-7 items-center mb-2 w-full `}>
            <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={durationLoader} loop={false} callbackAfterLoading={() => setLoading(false)} />

            {/* Discard Changes Dialog */}
            <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                        <AlertDialogDescription>
                            You have unsaved changes. Are you sure you want to discard them and leave this page?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancelDiscard}>
                            Stay on Page
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDiscardChanges} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Discard Changes
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

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
                                                                className={`appearance-none border-none bg-secondary/80 ${/* GODLY_TASKS.includes(task.name) ? "text-foreground/50 cursor-not-allowed" :  */"text-foreground"}  rounded-md p-1`}
                                                            // disabled={GODLY_TASKS.includes(task.name)}
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
                            className={`group disabled:grayscale-25 p-7 text-xl`}
                            type="submit"
                        >
                            <p className={`group-enabled:animate-bounce flex gap-2 items-center`}>
                                {form.formState.isSubmitting ? <>Saving...<Loader2 className="animate-spin" size={120} /></> : <>Save progress<SaveAll className='size-7' /></>}
                            </p>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}