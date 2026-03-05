import { collectionTask } from '@/db/mongodb/mongodb'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { classNamesState, classNamesType, doneInWhichWay, failEmojis, GODLY_TASKS, stateEmoji, successEmojis } from '@/constants'
import { cn, DateString, getDayName, getFormattedTime, getMostRepeatedState, sortByProperty } from '@/lib/utils'
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
import ButtonToggleQueryBasedStatistics from '@/components/ButtonToggleQueryBasedStatistics'
import ButtonChangePreviousDayLastTaskState from '@/components/ButtonChangePreviousDayLastTaskState'
import { Loader2Icon } from 'lucide-react'
import { Suspense } from 'react'

export default async function page({
    searchParams
}: {
    searchParams?: Promise<{
        search?: string;
        day?: string;
        fromDate?: string;
        queryStatistics?: string;
    }>,
}) {
    connection()

    const { search, day, fromDate, queryStatistics } = searchParams ? await searchParams : {};
    const searchValue = search ? search : ""
    const dayValue = day ? day : ""
    const queryStatisticsValue = queryStatistics === "true"

    const today = new Date()

    const allDaysInfoNoQuery = await collectionTask.find({}).sort({ date: -1 }).toArray()

    const fromDateValue = fromDate ? new Date(new Date(fromDate).getTime() - 5 * 60 * 60 * 1000) : new Date(allDaysInfoNoQuery.at(6)!.date)

    const allDaysInfoDb = await collectionTask.aggregate([
        {
            $match: { date: { $gte: fromDateValue } }
        },
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
        { $match: { tasks: { $ne: [] } } }
    ]).sort({ date: -1 }).toArray() as WithId<DailyTaskAndDetails>[]

    if (!allDaysInfoDb) return <p>No days on track</p>

    const allDaysInfo = dayValue && dayValue !== "all" ? allDaysInfoDb.filter(c => getDayName(c.date) === dayValue) : allDaysInfoDb

    const allDaysInfoUsedForStatistics = queryStatisticsValue ? allDaysInfoNoQuery : allDaysInfo

    const allDaysMostRepeated = allDaysInfoUsedForStatistics.map(c => getMostRepeatedState(c.tasks))

    const doneDays = allDaysMostRepeated.filter(day => day === "done").length
    const noDoneDays = allDaysMostRepeated.filter(day => day === "no done").length
    const occupiedDays = allDaysMostRepeated.filter(day => day === "occupied").length

    const daysWithoutLust = allDaysInfoUsedForStatistics.filter(c => isHolyLastTaskDone(c.tasks) === true).length
    const daysWithLust = allDaysInfoUsedForStatistics.filter(c => isHolyLastTaskDone(c.tasks) === false).length

    function calculatePercentage(part: number) {
        return ((part / allDaysMostRepeated.length) * 100).toFixed(2);
    }

    function isHolyLastTaskDone(tasks: DailyTaskAndDetails["tasks"]) {
        const lastTask = tasks
            .filter(c => GODLY_TASKS.includes(c.name))
            .slice(-1)[0];
        if (!lastTask) {
            const actualLastTask = tasks[tasks.length - 1];
            return actualLastTask.state === "done" ? true : false;
        }
        return lastTask.state === "done" ? true : false;
    }

    function getLastDaysAreWithoutLust() {
        const allDaysInfoUsedForStatisticsSorted = [...allDaysInfoUsedForStatistics].reverse()
        let streak = 0;
        const allDaysInRow = []
        for (let i = allDaysInfoUsedForStatisticsSorted.length - 1; i >= 0; i--) {
            const day = allDaysInfoUsedForStatisticsSorted[i];
            if (isHolyLastTaskDone(day.tasks)) {
                if (streak === 0) allDaysInRow.push(day.date)
                streak++;
            } else {
                break;
            }
        }
        return {
            streak,
            firstDay: allDaysInRow.at(0),
            lastDay: allDaysInRow.reverse().at(0)
        };
    }

    function getBestStreakWithoutLust() {
        if (allDaysInfoUsedForStatistics.length === 0) return { streak: 0, beginningDate: "N/A", endDate: "N/A" };

        let maxStreak = 0;
        let currentStreak = 0;
        let streakStart: Date | null = null;
        let bestStart: Date | null = null;
        let bestEnd: Date | null = null;

        allDaysInfoUsedForStatistics.forEach((day) => {
            if (isHolyLastTaskDone(day.tasks)) {
                if (currentStreak === 0) streakStart = day.date;
                currentStreak++;
                if (currentStreak > maxStreak) {
                    maxStreak = currentStreak;
                    bestEnd = streakStart;
                    bestStart = day.date;
                }
            } else {
                currentStreak = 0;
            }
        });

        const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        return {
            streak: maxStreak,
            beginningDate: formatter.format(bestStart!.getTime() + 5 * 60 * 60 * 1000),
            endDate: formatter.format(bestEnd!.getTime() + 5 * 60 * 60 * 1000)
        };
    }

    function getLastDaysAreWithLust() {
        const allDaysInfoUsedForStatisticsSorted = [...allDaysInfoUsedForStatistics].reverse()
        let streak = 0;
        for (let i = allDaysInfoUsedForStatisticsSorted.length - 1; i >= 0; i--) {
            const day = allDaysInfoUsedForStatisticsSorted[i];
            if (!isHolyLastTaskDone(day.tasks)) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    }

    function getWorstStreakWithLust() {
        if (allDaysInfoUsedForStatistics.length === 0) return { streak: 0, beginningDate: "N/A", endDate: "N/A" };
        let maxStreak = 0;
        let currentStreak = 0;
        let streakStart: Date | null = null;
        let bestStart: Date | null = null;
        let bestEnd: Date | null = null;

        allDaysInfoUsedForStatistics.forEach((day) => {
            if (!isHolyLastTaskDone(day.tasks)) {
                if (currentStreak === 0) streakStart = day.date;
                currentStreak++;
                if (currentStreak > maxStreak) {
                    maxStreak = currentStreak;
                    bestEnd = streakStart;
                    bestStart = day.date;
                }
            } else {
                currentStreak = 0;
            }
        });

        const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        return {
            streak: maxStreak,
            beginningDate: formatter.format(new Date(bestStart!.getTime() + 5 * 60 * 60 * 1000)),
            endDate: formatter.format(new Date(bestEnd!.getTime() + 5 * 60 * 60 * 1000))
        };
    }

    const suspenseKey = `${searchValue}-${dayValue}-${fromDate ?? 'all'}`

    return (
        // Full-width container, padded on mobile, centered content
        <div className="w-[80%] px-3 sm:px-6">
            <QueryTasks
                searchValue={searchValue}
                dayValue={dayValue}
                fromDateValue={new Date(fromDateValue.getTime() + 8 * 60 * 60 * 1000)}
            />

            {/* Statistics accordion */}
            <div className="flex flex-col items-start gap-2 text-base sm:text-xl mb-4 w-full">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem className="flex flex-col justify-center items-center gap-2" value="legend">
                        <AccordionTrigger>
                            <h2 className="text-xl sm:text-2xl font-bold">Overall Statistics Summary 📊</h2>
                        </AccordionTrigger>

                        <AccordionContent className="flex flex-col items-center gap-2 text-base sm:text-xl mb-4 w-full">
                            {/* Total days + toggle button */}
                            <div className="flex flex-wrap gap-3 items-center justify-center w-full">
                                <p className="font-semibold text-2xl sm:text-3xl">Total days: {allDaysInfoUsedForStatistics.length}</p>
                                <ButtonToggleQueryBasedStatistics />
                            </div>

                            <Separator orientation="horizontal" className="bg-foreground" />

                            {/* Done / No Done / Occupied stats — wrap on mobile */}
                            <div className="flex flex-wrap gap-x-3 gap-y-1 items-center justify-center">
                                <p>✅{doneDays} ({calculatePercentage(doneDays)}%)</p>
                                <Separator orientation="vertical" className="bg-accent h-5 hidden sm:block" decorative />
                                <p>❌{noDoneDays} ({calculatePercentage(noDoneDays)}%)</p>
                                <Separator orientation="vertical" className="bg-accent h-5 hidden sm:block" decorative />
                                <p>☑️{occupiedDays} ({calculatePercentage(occupiedDays)}%)</p>
                            </div>

                            <Separator orientation="horizontal" className="bg-accent" />

                            {/* Lust / Holy stats */}
                            <div className="flex flex-wrap gap-x-3 gap-y-1 items-center justify-center">
                                <p>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger className="font-bold text-xl sm:text-2xl">{failEmojis.join("")}</TooltipTrigger>
                                            <TooltipContent>
                                                <ul>
                                                    <li>{failEmojis[0]} Regret and sorrow for the sin.</li>
                                                    <li>{failEmojis[1]} The struggle and temptation of lust.</li>
                                                    <li>{failEmojis[2]} Turning to Christ for forgiveness, holiness, and righteousness.</li>
                                                </ul>
                                                <p className="font-bold">Stay strong in faith—God&apos;s grace is greater than any failure!</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {' '}{daysWithLust} ({calculatePercentage(daysWithLust)}%)
                                </p>
                                <Separator orientation="vertical" className="bg-accent-foreground h-5 hidden sm:block" decorative />
                                <p>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger className="font-bold text-xl sm:text-2xl">{successEmojis.join("")}</TooltipTrigger>
                                            <TooltipContent>
                                                <ul>
                                                    <li>{successEmojis[0]} Joy and peace in victory over sin.</li>
                                                    <li>{successEmojis[1]} Purity and self-control through God&apos;s strength.</li>
                                                    <li>{successEmojis[2]} Walking in faith and righteousness with Christ.</li>
                                                </ul>
                                                <p className="font-bold">Keep fighting the good fight!</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    {' '}{daysWithoutLust} ({calculatePercentage(daysWithoutLust)}%)
                                </p>
                            </div>

                            <Separator orientation="horizontal" className="bg-foreground" />

                            {/* Success streaks */}
                            <p>{successEmojis.join("")} Streaks</p>
                            {/* Wrap long date ranges on small screens */}
                            <p className="text-center text-sm sm:text-base">
                                Current:{' '}
                                <span className="font-bold">{getLastDaysAreWithoutLust().streak} days</span>{' '}
                                in a row ({DateString(getLastDaysAreWithoutLust().firstDay)} - {DateString(getLastDaysAreWithoutLust().lastDay)})
                            </p>
                            <p className="text-center text-sm sm:text-base">
                                Best:{' '}
                                <span className="font-bold">{getBestStreakWithoutLust().streak} days</span>{' '}
                                ({getBestStreakWithoutLust().beginningDate} - {getBestStreakWithoutLust().endDate}){' '}
                                ({queryStatisticsValue ? "All time" : "Query based"})
                            </p>

                            <Separator orientation="horizontal" className="bg-foreground" />

                            {/* Failure streaks */}
                            <p>{failEmojis.join("")} Streaks</p>
                            <p className="text-center text-sm sm:text-base">
                                Current:{' '}
                                <span className="font-bold">{getLastDaysAreWithLust()} days</span>{' '}
                                in a row
                            </p>
                            <p className="text-center text-sm sm:text-base">
                                Worst:{' '}
                                <span className="font-bold">{getWorstStreakWithLust().streak} days</span>{' '}
                                ({getWorstStreakWithLust().beginningDate} - {getWorstStreakWithLust().endDate}){' '}
                                ({queryStatisticsValue ? "All time" : "Query based"})
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Days list */}
            <Suspense key={suspenseKey} fallback={<Loader2Icon className="animate-spin size-20" />}>
                {/* Full width on mobile, 80% on desktop */}
                <Accordion type="single" collapsible className="w-full sm:w-[80%] sm:mx-auto">
                    {allDaysInfo.map((day, cIndex) => {
                        const documentId = new ObjectId(day._id);
                        const timestamp = documentId.getTimestamp();
                        const formattedTime = getFormattedTime(timestamp);

                        return (
                            <div key={day._id.toString() + day.date} className="flex flex-row justify-center items-start">
                                <AccordionItem className="flex flex-col items-center gap-2 flex-1 min-w-0" value={day.date.toString()}>
                                    {/* Trigger text wraps properly on mobile */}
                                    <AccordionTrigger className="font-bold text-base sm:text-2xl text-left">
                                        {DateString(day.date)}{' '}
                                        {day.date == today
                                            ? `${stateEmoji[getMostRepeatedState(day.tasks)]} 🙏Fear, ❤love and 🙌glorify God today`
                                            : doneInWhichWay[getMostRepeatedState(day.tasks)]}
                                    </AccordionTrigger>

                                    <AccordionContent className="w-full">
                                        <p className="text-sm sm:text-base mb-1">Added at: {formattedTime}</p>
                                        {sortByProperty(day.tasks, "time").map((task, taskIndex) => {
                                            // const occupiedAndNotSpiritual = task.state === "occupied" && task.type !== "spiritual"
                                            const occupied = task.state === "occupied"
                                            return (
                                                <div key={cIndex + task.name + task.time + taskIndex} className="flex flex-col items-start justify-center group">
                                                    {task.name === "Battle Prayer ⚔🛡 and thanksgiving 🙏" ? <Separator className="my-2" /> : null}
                                                    <p className={cn(occupied ? null : classNamesType[task.type], classNamesState[task.state], "my-1 flex gap-1 text-sm sm:text-base flex-wrap")}>
                                                        {occupied ?
                                                            <span>
                                                                <span className="group-hover:hidden flex">{"Either Working or occupied... "}</span>
                                                                <span className="hidden group-hover:flex">{task.name}</span>
                                                            </span>
                                                            : `${task.name} `}
                                                        <span className="font-semibold">({task.time})</span>
                                                    </p>
                                                </div>
                                            )
                                        })}
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Emoji indicator — shrink-0 so it never squishes the accordion */}
                                {searchValue != "" ? null : day.date == today ? null : isHolyLastTaskDone(day.tasks) === false ?
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger className="font-bold text-lg sm:text-2xl select-none mt-3 sm:mt-4 shrink-0 ml-1">{failEmojis.join("")}</TooltipTrigger>
                                            <TooltipContent className="flex flex-col items-center justify-center max-w-[90vw] sm:max-w-sm">
                                                <ul>
                                                    <li>{failEmojis[0]} Regret and sorrow for the sin.</li>
                                                    <li>{failEmojis[1]} The struggle and temptation of lust.</li>
                                                    <li>{failEmojis[2]} Turning to Christ for forgiveness, holiness, and righteousness.</li>
                                                </ul>
                                                <p className="font-bold">Stay strong in faith God&apos;s grace is greater than any failure!</p>
                                                <ButtonChangePreviousDayLastTaskState
                                                    text={successEmojis.join("") + " Done?"}
                                                    tasks={day.tasks}
                                                    date={day.date}
                                                />
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    :
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger className="font-bold text-lg sm:text-2xl select-none mt-3 sm:mt-4 shrink-0 ml-1">{successEmojis.join("")}</TooltipTrigger>
                                            <TooltipContent className="flex flex-col items-center justify-center max-w-[90vw] sm:max-w-sm">
                                                <ul>
                                                    <li>{successEmojis[0]} Joy and peace in victory over sin.</li>
                                                    <li>{successEmojis[1]} Purity and self-control through God&apos;s strength.</li>
                                                    <li>{successEmojis[2]} Walking in faith and righteousness with Christ.</li>
                                                </ul>
                                                <p className="font-bold">Keep fighting the good fight!</p>
                                                <ButtonChangePreviousDayLastTaskState
                                                    text={failEmojis.join("") + " Not done?"}
                                                    tasks={day.tasks}
                                                    date={day.date}
                                                />
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                }
                            </div>
                        )
                    })}
                </Accordion>
            </Suspense>
        </div>
    )
}