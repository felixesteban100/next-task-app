import { collectionTask } from '@/db/mongodb/mongodb'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { classNamesState, classNamesType, doneInWhichWay, failEmojis, GODLY_TASKS, stateEmoji, successEmojis } from '@/constants'
import { cn, DateString, getDayName, getMostRepeatedState, /* getTodaysDate, */ sortByProperty } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { connection } from "next/server";
import { ObjectId, WithId } from 'mongodb'
import QueryTasks from '@/components/QueryTasks'
import { DailyTaskAndDetails } from '@/components/TaskToEdit'

export default async function page({
    searchParams
}: {
    searchParams?: Promise<{
        search?: string;
        day?: string;
    }>,
}) {
    connection()

    const { search, day } = searchParams ? await searchParams : {};
    const searchValue = search ? search : ""
    const dayValue = day ? day : ""

    const today = new Date()//getTodaysDate()

    const allDaysInfoDb = await collectionTask.aggregate([
        {
            $project: {
                tasks: {
                    $filter: {
                        input: "$tasks",
                        as: "task",
                        cond: { $regexMatch: { input: "$$task.name", regex: searchValue, options: "i" } }
                    }
                },
                date: true,
                _id: true
            }
        },
        { $match: { tasks: { $ne: [] } } } // Remove documents where no tasks match
    ]).sort({ date: -1 }).toArray() as WithId<DailyTaskAndDetails>[]

    if (!allDaysInfoDb) return <p>No days on track</p>

    const allDaysInfoByDay = allDaysInfoDb.filter(c => getDayName(c.date) === dayValue)

    const allDaysInfo = dayValue && dayValue !== "all" ? allDaysInfoByDay : allDaysInfoDb

    const allDaysMostRepeated = allDaysInfo.map(c => getMostRepeatedState(c.tasks))

    const doneDays = allDaysMostRepeated.filter(day => day === "done").length
    const noDoneDays = allDaysMostRepeated.filter(day => day === "no done").length
    const occupiedDays = allDaysMostRepeated.filter(day => day === "occupied").length

    const daysWithoutLust = allDaysInfo.filter(c => isHolyLastTaskDone(c.tasks) === true).length
    const daysWithLust = allDaysInfo.filter(c => isHolyLastTaskDone(c.tasks) === false).length

    function calculatePercentage(part: number) {
        return ((part / allDaysMostRepeated.length) * 100).toFixed(2);
    }


    function isHolyLastTaskDone(tasks: DailyTaskAndDetails["tasks"]) {
        // const lastTask = tasks.filter(c => c.name === PREVIOUS_GODLY_TASK || c.name == GODLY_TASK || c.name == ULTIMATE_GODLY_TASK).slice(-1)[0];
        const lastTask = tasks
            .filter(c => GODLY_TASKS.includes(c.name))
            .slice(-1)[0];
        if (!lastTask) {
            // If no holy task found, check the actual last task in the list
            const actualLastTask = tasks[tasks.length - 1];
            return actualLastTask.state === "done" ? true : false;
        }
        return lastTask.state === "done" ? true : false;
    }

    return (
        <>
            <div className='flex flex-col items-center gap-2 text-xl mb-4'>
                <p className='font-semibold'>Total days: {allDaysInfo.length}</p>
                <Separator orientation='horizontal' className='bg-foreground' />
                <div className='flex gap-2 h-7'>
                    <p>✅{doneDays} ({calculatePercentage(doneDays)}%)</p>
                    <Separator orientation='vertical' className='bg-foreground' decorative />
                    <p>❌{noDoneDays} ({calculatePercentage(noDoneDays)}%)</p>
                    <Separator orientation='vertical' className='bg-foreground' decorative />
                    <p>☑️{occupiedDays} ({calculatePercentage(occupiedDays)}%)</p>
                </div>
                {searchValue != "" ? null :
                    <>
                        <Separator orientation='horizontal' className='bg-foreground' />
                        <div className='flex gap-2 h-7'>
                            <p>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className='font-bold text-2xl'>{failEmojis.join("")}</TooltipTrigger>
                                        <TooltipContent>
                                            <ul>
                                                <li>{failEmojis[0]} Regret and sorrow for the sin.</li>
                                                <li>{failEmojis[1]} The struggle and temptation of lust.</li>
                                                <li>{failEmojis[2]} Turning to Christ for forgiveness, holiness, and righteousness.</li>
                                            </ul>
                                            <p className='font-bold'>Stay strong in faith—God’s grace is greater than any failure!</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {daysWithLust} ({calculatePercentage(daysWithLust)}%)
                            </p>
                            <Separator orientation='vertical' className='bg-foreground' decorative />
                            <p>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className='font-bold text-2xl'>{successEmojis.join("")}</TooltipTrigger>
                                        <TooltipContent>
                                            <ul>
                                                <li>{successEmojis[0]} Joy and peace in victory over sin.</li>
                                                <li>{successEmojis[1]} Purity and self-control through God&apos;s strength.</li>
                                                <li>{successEmojis[2]} Walking in faith and righteousness with Christ.</li>
                                            </ul>
                                            <p className='font-bold'>Keep fighting the good fight!</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {daysWithoutLust} ({calculatePercentage(daysWithoutLust)}%)
                            </p>
                        </div>
                    </>}
            </div>
            <QueryTasks searchValue={searchValue} dayValue={dayValue} />
            <Accordion type="single" collapsible className="w-[80%]">
                {allDaysInfo.map((day, cIndex) => {
                    const documentId = new ObjectId(day._id); // Example _id
                    const timestamp = documentId.getTimestamp(); // Get the creation timestamp

                    const formattedTime = new Intl.DateTimeFormat("en-US", {
                        timeZone: "America/New_York",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                    }).format(timestamp);

                    return (
                        <div key={day._id.toString() + day.date} className='flex flex-row justify-center items-start'>
                            <AccordionItem className='flex flex-col items-center gap-2' value={day.date.toString()}>
                                <AccordionTrigger className='font-bold text-2xl' >
                                    {DateString(day.date)} ({getDayName(day.date).slice(0, 3)})  {day.date == today ? `${stateEmoji[getMostRepeatedState(day.tasks)]} 🙏Fear, ❤love and 🙌glorify God today` : doneInWhichWay[getMostRepeatedState(day.tasks)]}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p>Added at: {formattedTime}</p>
                                    {sortByProperty(day.tasks, "time").map((task, taskIndex) => {
                                        const occupiedAndNotSpiritual = task.state === "occupied" && task.type !== "spiritual"
                                        return (
                                            <div key={cIndex + task.name + task.time + taskIndex} className='flex flex-col items-start justify-center group'>
                                                {task.name === "Battle Prayer ⚔🛡 and thanksgiving 🙏" ? <Separator className='my-2' /> : null}
                                                {/* <p className={`${classNamesState[task.state]}`}>{stateEmoji[task.state]} {task.name} <span className='font-semibold'>({task.time})</span></p> */}
                                                <p
                                                    className={cn(occupiedAndNotSpiritual ? null : classNamesType[task.type], classNamesState[task.state], "my-1 flex gap-1")}
                                                >
                                                    {/* {occupiedAndNotSpiritual ? "Either Working or occupied..." : task.name} */}
                                                    {occupiedAndNotSpiritual ?
                                                        <span>
                                                            <span className='group-hover:hidden flex'>{"Either Working or occupied... "}</span>
                                                            <span className='hidden group-hover:flex'>{task.name}</span>
                                                        </span>
                                                        : `${task.name} `}
                                                    <span className='font-semibold'>({task.time})</span>
                                                </p>
                                            </div>
                                        )
                                    })}
                                </AccordionContent>
                            </AccordionItem>
                            {searchValue != "" ? null : day.date == today ? null : isHolyLastTaskDone(day.tasks) === false ?
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className='font-bold text-2xl mt-4'>{failEmojis.join("")}</TooltipTrigger>
                                        <TooltipContent>
                                            <ul>
                                                <li>{failEmojis[0]} Regret and sorrow for the sin.</li>
                                                <li>{failEmojis[1]} The struggle and temptation of lust.</li>
                                                <li>{failEmojis[2]} Turning to Christ for forgiveness, holiness, and righteousness.</li>
                                            </ul>
                                            <p className='font-bold'>Stay strong in faith—God’s grace is greater than any failure!</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                :
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className='font-bold text-2xl'>{successEmojis.join("")}</TooltipTrigger>
                                        <TooltipContent>
                                            <ul>
                                                <li>{successEmojis[0]} Joy and peace in victory over sin.</li>
                                                <li>{successEmojis[1]} Purity and self-control through God&apos;s strength.</li>
                                                <li>{successEmojis[2]} Walking in faith and righteousness with Christ.</li>
                                            </ul>
                                            <p className='font-bold'>Keep fighting the good fight!</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            }
                        </div>
                    )
                })}
            </Accordion>
        </>
    )
}
