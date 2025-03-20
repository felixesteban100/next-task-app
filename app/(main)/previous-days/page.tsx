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

    function calculatePercentage(part: number) {
        return ((part / allDaysInfo.length) * 100).toFixed(2);
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
            </div>
            <Accordion type="single" collapsible className="w-[65%]">
                {allDaysInfo.map((c, cIndex) => {
                    const documentId = new ObjectId(c._id); // Example _id
                    const timestamp = documentId.getTimestamp(); // Get the creation timestamp

                    // Format the time as HH:MM:SS
                    const hours = timestamp.getHours().toString().padStart(2, "0");
                    const minutes = timestamp.getMinutes().toString().padStart(2, "0");
                    const seconds = timestamp.getSeconds().toString().padStart(2, "0");

                    const period = parseInt(hours) >= 12 ? "PM" : "AM"; // Determine AM or PM

                    const formattedTime = `${hours}:${minutes}:${seconds} ${period}`;

                    return (
                        <div key={c._id.toString() + c.date} className='flex flex-row justify-center items-start'>
                            <AccordionItem className='flex flex-col items-center gap-2' value={c.date}>
                                <AccordionTrigger className='font-bold text-2xl' >
                                    {c.date} {c.date == today ? "🙏Fear, ❤love and 🙌glorify God today" : doneInWhichWay[getMostRepeatedState(c.tasks)]}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p>Added at: {formattedTime}</p>
                                    {c.tasks.reverse().map((task, taskIndex) => {
                                        return (
                                            <div key={cIndex + task.name + task.time + taskIndex}>
                                                {task.name === "Say what you did recently: was it sinful or righteous before God?" ? <Separator className="my-5" /> : null}
                                                <p className={`${classNamesState[task.state]}`}>{stateEmoji[task.state]} {task.name} <span className='font-semibold'>({task.time})</span></p>
                                            </div>
                                        )
                                    })}
                                </AccordionContent>
                            </AccordionItem>
                            {c.date == today ? null : c.tasks.some(c => c.name === "Battle Prayer ⚔🛡 and thanksgiving 🙏(Kneel down and speak aloud)" && c.state === "no done") === true ?
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
