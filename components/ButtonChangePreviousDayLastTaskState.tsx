"use client"

import React, { useState } from 'react'
import { Button } from './ui/button'
import { toggleGodlyTaskOfPreviousDate } from '@/server/actions'
import { Task } from './TaskToEdit'
import { GODLY_TASKS } from '@/constants'
import { toast } from 'sonner'
import { DateString } from '@/lib/utils'

export default function ButtonChangePreviousDayLastTaskState({ text, date, tasks }: { text: string, tasks: Task[], date: Date }) {
    const [isLoading, setIsLoading] = useState(false)

    async function handleChange() {
        const changedTasks = tasks.map((task) => {
            if (GODLY_TASKS.includes(task.name)) {
                const toggledState = task.state === 'done' ? 'no done' : 'done'
                return { ...task, state: toggledState } satisfies Task
            }
            return task
        })
        setIsLoading(true)
        const result = await toggleGodlyTaskOfPreviousDate(date, changedTasks)
        if (result) {
            toast.success(`Successfully updated tasks of date: ${DateString(date)}`, { id: DateString(date) })
            setIsLoading(false)
        } else {
            toast.error(`Failed to update tasks of date: ${DateString(date)}`, { id: DateString(date) })
            setIsLoading(false)
        }
    }

    return (
        <Button disabled={isLoading} onClick={() => handleChange()} className='mt-2' > {text}</Button >
    )
}
