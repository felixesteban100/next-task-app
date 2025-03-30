import { collectionTask } from '@/db/mongodb/mongodb'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { classNamesState, doneInWhichWay, stateEmoji } from '@/constants'
import { getMostRepeatedState, getTodaysDate } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { connection } from "next/server";
import { ObjectId } from 'mongodb'

export default async function page() {
    connection()

    const today = getTodaysDate()
    const allDaysInfo = await collectionTask.find().sort({ date: -1 }).toArray()

    if (!allDaysInfo) return <p>No days on track</p>

    const allDaysMostRepeated = allDaysInfo.map(c => getMostRepeatedState(c.tasks))

    const doneDays = allDaysMostRepeated.filter(day => day === "done").length
    const noDoneDays = allDaysMostRepeated.filter(day => day === "no done").length
    const jobOccupiedDays = allDaysMostRepeated.filter(day => day === "job/occupied").length

    const daysWithOutLastOne = allDaysInfo.slice(1, allDaysInfo.length) // Exclude the last day to avoid bias in calculations
    const daysWithoutLust = daysWithOutLastOne.filter(c => c.tasks[c.tasks.length - 1].state === "done").length
    const daysWithLust = daysWithOutLastOne.filter(c => c.tasks[c.tasks.length - 1].state === "no done").length

    function calculatePercentage(part: number) {
        return ((part / allDaysMostRepeated.length) * 100).toFixed(2);
    }

    function calculatePercentageWithoutLastOne(part: number) {
        return ((part / daysWithOutLastOne.length) * 100).toFixed(2);
    }

    return (
        <>
            <div className='flex flex-col items-center gap-2 text-xl'>
                <p className='font-semibold'>Total days: {allDaysInfo.length}</p>
                <Separator orientation='horizontal' className='bg-foreground' />
                <div className='flex gap-2 h-7'>
                    <p>✅{doneDays} ({calculatePercentage(doneDays)}%)</p>
                    <Separator orientation='vertical' className='bg-foreground' decorative />
                    <p>❌{noDoneDays} ({calculatePercentage(noDoneDays)}%)</p>
                    <Separator orientation='vertical' className='bg-foreground' decorative />
                    <p>☑️{jobOccupiedDays} ({calculatePercentage(jobOccupiedDays)}%)</p>
                </div>
                <Separator orientation='horizontal' className='bg-foreground' />
                <div className='flex gap-2 h-7'>
                    <p>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className='font-bold text-2xl'>😞🔥✝️</TooltipTrigger>
                                <TooltipContent>
                                    <ul>
                                        <li>😞 Regret and sorrow for the sin.</li>
                                        <li>🔥 The struggle and temptation of lust.</li>
                                        <li>✝️ Turning to Christ for forgiveness, holiness, and righteousness.</li>
                                    </ul>
                                    <p className='font-bold'>Stay strong in faith—God’s grace is greater than any failure!</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>{daysWithLust} ({calculatePercentageWithoutLastOne(daysWithLust)}%)
                    </p>
                    <Separator orientation='vertical' className='bg-foreground' decorative />
                    <p>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className='font-bold text-2xl'>😊❄️✝️</TooltipTrigger>
                                <TooltipContent>
                                    <ul>
                                        <li>😊 Joy and peace in victory over sin.</li>
                                        <li>❄️ Purity and self-control through God&apos;s strength.</li>
                                        <li>✝️ Walking in faith and righteousness with Christ.</li>
                                    </ul>
                                    <p className='font-bold'>Keep fighting the good fight!</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>{daysWithoutLust} ({calculatePercentageWithoutLastOne(daysWithoutLust)}%)
                    </p>
                </div>
            </div>
            <Accordion type="single" collapsible className="w-[65%]">
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
                            <AccordionItem className='flex flex-col items-center gap-2' value={day.date}>
                                <AccordionTrigger className='font-bold text-2xl' >
                                    {day.date} {day.date == today ? `${stateEmoji[getMostRepeatedState(day.tasks)]} 🙏Fear, ❤love and 🙌glorify God today` : doneInWhichWay[getMostRepeatedState(day.tasks)]}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p>Added at: {formattedTime}</p>
                                    {day.tasks.slice().reverse().map((task, taskIndex) => {
                                        return (
                                            <div key={cIndex + task.name + task.time + taskIndex}>
                                                {task.name === "Say what you did recently: was it sinful or righteous before God?" ? <Separator className="my-5" /> : null}
                                                <p className={`${classNamesState[task.state]}`}>{stateEmoji[task.state]} {task.name} <span className='font-semibold'>({task.time})</span></p>
                                            </div>
                                        )
                                    })}
                                </AccordionContent>
                            </AccordionItem>
                            {/* (c.name === "Battle Prayer ⚔🛡 and thanksgiving 🙏(Kneel down and speak aloud)" || c.name === "Are you going to honor God, love your family and invest in your future?") */}
                            {day.date == today ? null : day.tasks.some((c, index) => index === 0 && c.state === "no done") === true ?
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className='font-bold text-2xl mt-4'>😞🔥✝️</TooltipTrigger>
                                        <TooltipContent>
                                            <ul>
                                                <li>😞 Regret and sorrow for the sin.</li>
                                                <li>🔥 The struggle and temptation of lust.</li>
                                                <li>✝️ Turning to Christ for forgiveness, holiness, and righteousness.</li>
                                            </ul>
                                            <p className='font-bold'>Stay strong in faith—God’s grace is greater than any failure!</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                :
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className='font-bold text-2xl mt-4'>😊❄️✝️</TooltipTrigger>
                                        <TooltipContent>
                                            <ul>
                                                <li>😊 Joy and peace in victory over sin.</li>
                                                <li>❄️ Purity and self-control through God&apos;s strength.</li>
                                                <li>✝️ Walking in faith and righteousness with Christ.</li>
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
