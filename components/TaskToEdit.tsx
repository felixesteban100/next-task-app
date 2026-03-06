"use client"

import { cn, DateString, filterFutureTimes, getTotalTasksByType, sortByProperty } from '@/lib/utils'
import { toast } from "sonner"

import { GODLY_TASKS, /* TASKS_THAT_DONT_SEPARATE_SECTIONS, TASKS_THAT_SEPARATE_SECTIONS, */ TIMES } from "@/constants"

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
import { CopyIcon, Loader2, SaveAll, TimerIcon } from "lucide-react"

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
import ButtonHideOccupied from './ButtonHideOccupied'
import ButtonTogglePreviousTasks from './ButtonTogglePreviousTasks'
import { useTabAndInactivityRedirect } from '@/lib/useTabAndInactivityRedirect'
import AnimateWrapper from './AnimateWrapper'

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
    id: z.number(),
    link: z.string().optional(),
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

    const handleDiscardChanges = () => {
        if (pendingNavigation) {
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

        const updatedTasks = tasksState.map((item, indexItem) =>
            `${item.name}_${item.time}_${indexItem}` === taskToEditName
                ? { ...item, [property]: newValue, }
                : item
        );
        fieldOnChange(sortByProperty(updatedTasks, "id"));
    }

    function updateTaskTimeToNow(
        task: Task,
        fieldOnChange: (value: Task[]) => void
    ) {
        const getMinutes = (timeStr: string) => {
            const [time, period] = timeStr.split(' ');
            const [h, m] = time.split(':').map(Number);
            const h24 = period === 'pm' && h !== 12 ? h + 12 : period === 'am' && h === 12 ? 0 : h;
            return h24 * 60 + m;
        };

        const updatedTasks = tasksState.map((item) => {
            if (`${item.name}_${item.time}_${item.id}` !== `${task.name}_${task.time}_${task.id}`) return item;

            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const closestTime = TIMES.reduce((a, b) => Math.abs(currentMinutes - getMinutes(b)) < Math.abs(currentMinutes - getMinutes(a)) ? b : a);
            return { ...item, time: closestTime };
        });

        fieldOnChange(sortByProperty(updatedTasks, "id"));
    }

    return (
        // Responsive outer container: full width, constrained max, centered
        <div className="flex flex-col gap-5 sm:gap-7 items-center mb-20 sm:mb-2 w-full px-3 sm:px-4">
            <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={durationLoader} loop={false} callbackAfterLoading={() => setLoading(false)} />

            {/* Discard Changes Dialog */}
            <AlertDialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
                <AlertDialogContent className="mx-4 max-w-[calc(100vw-2rem)] sm:max-w-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                        <AlertDialogDescription>
                            You have unsaved changes. Are you sure you want to discard them and leave this page?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col gap-2 sm:flex-row sm:gap-0">
                        <AlertDialogCancel onClick={handleCancelDiscard} className="w-full sm:w-auto">
                            Stay on Page
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDiscardChanges}
                            className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Discard Changes
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Header section */}
            <div className="flex flex-col gap-3 sm:gap-5 items-center justify-between w-full">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            {/* Responsive date heading */}
                            <span className="font-bold text-lg sm:text-2xl text-center block">
                                (Today) {DateString(new Date(date))}
                            </span>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Added at: {hourAdded}</p>
                            <div className="flex flex-col gap-2 items-center text-xl sm:text-2xl">
                                <p>Spiritual: {getTotalTasksByType(tasksState, "spiritual")}</p>
                                <p>Important: {getTotalTasksByType(tasksState, "important")}</p>
                                <p>Normal: {getTotalTasksByType(tasksState, "normal")}</p>
                                <p>Total: {doneTasks} {noDoneTasks} {occupiedTasks}</p>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {/* Control buttons — wrap on small screens */}
                <div className="flex flex-wrap gap-2 sm:gap-5 justify-center">
                    <ButtonOrganizeByTime />
                    <ButtonTogglePreviousTasks />
                    <ButtonHideOccupied />
                </div>

                {togglePreviousTasks ? (
                    <p className="text-sm italic">Previous tasks are hidden</p>
                ) : null}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:gap-5 items-center justify-center w-full">
                    <FormField
                        control={form.control}
                        name="tasks"
                        render={({ field }) => {
                            const tasksToShow = (togglePreviousTasks
                                ? sortByProperty(field.value, organizeByTime ? "time" : "id").filter(task => filterFutureTimes(TIMES).includes(task.time))
                                : sortByProperty(field.value, organizeByTime ? "time" : "id"))

                            return (
                                <FormItem>
                                    <FormMessage />
                                    <FormControl>
                                        {/* Center the entire task list, constrain width */}
                                        <div className="flex flex-col items-center w-full">
                                            <div className="w-full max-w-2xl ">
                                                {tasksToShow.map((task, i) => {
                                                    const occupied = task.state === "occupied"

                                                    return (
                                                        <AnimateWrapper key={task.name + task.time + task.id} keyItem={task.name + task.time + task.id}>
                                                            {/* Hour separator */}
                                                            {(i !== 0 && !(i + 1 >= tasksToShow.length)
                                                                &&
                                                                (task.time.split(":")[0] > tasksToShow[i - 1]?.time.split(":")[0] && task.state !== "occupied" && tasksToShow[i - 1].state !== "occupied" && tasksToShow[i + 1].state !== "occupied")
                                                                ||
                                                                (task.state === "occupied" && tasksToShow[i + 1]?.state === "occupied" && tasksToShow[i - 1]?.state !== "occupied")
                                                                ||
                                                                (task.state !== "occupied" && tasksToShow[i - 1]?.state === "occupied" && tasksToShow[i - 2]?.state === "occupied")
                                                            )
                                                                ? <Separator className="my-3 sm:my-5" />
                                                                : null}

                                                            <div className="group/task flex flex-row gap-2 items-center justify-start w-full py-0.5 md:py-0">

                                                                {/* State emoji buttons */}
                                                                <div className="flex flex-row gap-0.5 items-center shrink-0">
                                                                    {Object.entries(stateEmoji).map(([state, emoji]) => {
                                                                        if (GODLY_TASKS.includes(task.name) && state === "occupied") {
                                                                            return (
                                                                                <Button
                                                                                    disabled
                                                                                    type="button"
                                                                                    size="icon"
                                                                                    variant="ghost"
                                                                                    key={task.id + state}
                                                                                    className="h-8 w-8 sm:h-10 sm:w-10"
                                                                                />
                                                                            )
                                                                        }
                                                                        return (
                                                                            <Button
                                                                                key={task.id + state}
                                                                                type="button"
                                                                                size="icon"
                                                                                variant="ghost"
                                                                                className={`h-8 w-8 sm:h-10 sm:w-10 ${task.state !== state ? "grayscale-100" : ""}`}
                                                                                onClick={() => updateTask(`${task.name}_${task.time}_${task.id}->${state}`, task, task.id, "state", field.onChange)}
                                                                            >
                                                                                {emoji}
                                                                            </Button>
                                                                        )
                                                                    })}
                                                                </div>

                                                                {/* Task name + optional link copy button */}
                                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                                    <p
                                                                        className={cn(
                                                                            occupied ? null : `${classNamesType[task.type]}`,
                                                                            classNamesState[task.state],
                                                                            "text-sm sm:text-base break-words "
                                                                        )}
                                                                    >
                                                                        {occupied && hideOccupied ? (
                                                                            <>
                                                                                <span className="group-hover/task:hidden block">{"Either Working or occupied..."}</span>
                                                                                <span className="hidden group-hover/task:block">{task.name}</span>
                                                                            </>
                                                                        ) : task.name}
                                                                    </p>

                                                                    {task.link != undefined && task.state !== "occupied" ? (
                                                                        <Button
                                                                            type="button"
                                                                            size="icon"
                                                                            variant="outline"
                                                                            className="h-8 w-8 sm:h-9 sm:w-9 shrink-0"
                                                                            onClick={() => {
                                                                                navigator.clipboard.writeText(task.link ?? "")
                                                                                toast.info("Link copied to clipboard!", {
                                                                                    description: task.link,
                                                                                })
                                                                            }}
                                                                        >
                                                                            <CopyIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                                        </Button>
                                                                    ) : null}
                                                                </div>

                                                                {/* Time select + timer button */}
                                                                <div className="flex items-center gap-1.5 shrink-0">
                                                                    <select
                                                                        defaultValue={`${task.name}_${task.time}_${task.id}->${task.time}`}
                                                                        onChange={(e) => updateTask(e.target.value, task, task.id, "time", field.onChange)}
                                                                        className="appearance-none border-none bg-secondary/80 text-foreground rounded-md p-1 text-xs sm:text-sm"
                                                                    >
                                                                        {TIMES.map(c => ({
                                                                            value: `${task.name}_${task.time}_${task.id}->${c}`,
                                                                            name: c
                                                                        })).map((time) => (
                                                                            <option
                                                                                key={task.name + time.name}
                                                                                value={time.value}
                                                                                className={`bg-background ${!filterFutureTimes(TIMES).includes(time.name) ? "text-red-300 font-stretch-semi-condensed" : "text-foreground"}`}
                                                                            >
                                                                                {time.name}{!filterFutureTimes(TIMES).includes(time.name) && "!"}
                                                                            </option>
                                                                        ))}
                                                                    </select>

                                                                    {/* Timer button: always visible on mobile, hover-only on desktop */}
                                                                    <Button
                                                                        size="icon"
                                                                        variant="outline"
                                                                        className="flex sm:hidden group-hover/task:flex h-8 w-8 sm:h-9 sm:w-9 shrink-0"
                                                                        type="button"
                                                                        onClick={() => updateTaskTimeToNow(task, field.onChange)}
                                                                    >
                                                                        <TimerIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </AnimateWrapper>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )
                        }}
                    />

                    {/*
                        Save button:
                        - Mobile: fixed to bottom, full width with safe padding
                        - Desktop: fixed bottom-right corner (original behaviour)
                    */}
                    <div className="fixed bottom-0 left-0 right-0 p-3 bg-background/80 backdrop-blur-sm border-t sm:border-0 sm:bg-transparent sm:backdrop-blur-none sm:bottom-10 sm:left-auto sm:right-10 sm:p-0 z-50">
                        <Button
                            id="saveButton"
                            disabled={form.formState.isSubmitting || !formTasksChanged}
                            className="group/submit-button disabled:grayscale-25 w-full sm:w-auto px-5 py-5 sm:p-7 text-base sm:text-xl"
                            type="submit"
                        >
                            <p className="group-enabled/submit-button:animate-bounce flex gap-2 items-center justify-center">
                                {form.formState.isSubmitting
                                    ? <><span>Saving...</span><Loader2 className="animate-spin" size={20} /></>
                                    : <><span>Save progress</span><SaveAll className="size-5 sm:size-7" /></>
                                }
                            </p>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}