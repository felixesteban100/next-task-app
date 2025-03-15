import { collectionTask } from '@/db/mongodb/mongodb'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { classNamesState, doneInWhichWay, stateEmoji } from '@/constants'
import { getMostRepeatedState } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

export default async function page() {
    const allDaysInfo = await collectionTask.find().sort({ date: -1 }).toArray()

    if (!allDaysInfo) return <p>No days on track</p>

    const allDaysMostRepeated = allDaysInfo.map(c => getMostRepeatedState(c.tasks))

    const doneDays = allDaysMostRepeated.filter(day => day === "done").length
    const noDoneDays = allDaysMostRepeated.filter(day => day === "no done").length
    const jobOccupiedDays = allDaysMostRepeated.filter(day => day === "job/occupied").length

    function calculatePercentage(part: number) {
        return (part / allDaysInfo.length) * 100;
    }

    return (
        <>
            <div className='flex flex-col items-center gap-2'>
                <p>Total days: {allDaysInfo.length}</p>
                <Separator orientation='horizontal' className='bg-foreground' />
                <div className='flex gap-2 h-7'>
                    <p>✅ {doneDays} ({calculatePercentage(doneDays)}%)</p>
                    <Separator orientation='vertical' className='bg-foreground' decorative />
                    <p>❌ {noDoneDays} ({calculatePercentage(noDoneDays)}%)</p>
                    <Separator orientation='vertical' className='bg-foreground' decorative />
                    <p>☑️ {jobOccupiedDays} ({calculatePercentage(jobOccupiedDays)}%)</p>
                </div>
            </div>
            <Accordion type="single" collapsible className="w-[65%]">
                {allDaysInfo.map((c, cIndex) => (
                    <AccordionItem className='flex flex-col items-center gap-2' key={c.date} value={c.date}>
                        <AccordionTrigger className='font-bold text-2xl'>{c.date} {doneInWhichWay[getMostRepeatedState(c.tasks)]} {c.tasks.some(c => c.name === "Battle Prayer ⚔🛡 and thanksgiving 🙏(Kneel down and speak aloud)" && c.state === "no done") === true ? <span className='text-red-600'>Don't Lust</span> : null}</AccordionTrigger>
                        <AccordionContent className=''>
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
                ))}
            </Accordion>
        </>
    )
}
