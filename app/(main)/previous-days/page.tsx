import { collectionTask } from '@/db/mongodb/mongodb'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { classNamesState, stateEmoji } from '@/constants'

export default async function page() {
    const allDaysInfo = await collectionTask.find().toArray()

    if (!allDaysInfo) return <p>No days on track</p>

    return (
        <>
            <p>Total days: {allDaysInfo.length}</p>
            <p>How Many days succeded (count) (percentage)</p>
            <p>How Many days succeded (count) (percentage)</p>
            <Accordion type="single" collapsible className="w-full">
                {allDaysInfo.map(c => (
                    <AccordionItem key={c.date} value={c.date}>
                        <AccordionTrigger className='font-bold text-center text-2xl'>{c.date}</AccordionTrigger>
                        <AccordionContent>
                            {c.tasks.map(task => {
                                return (
                                    <div key={task.name + task.time}>
                                        <p className={`${classNamesState[task.state]}`}>{stateEmoji[task.state]} {task.name}</p>
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
