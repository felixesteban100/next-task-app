"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'
import { IdCard, Watch } from 'lucide-react'

export default function ButtonTogglePreviousTasks() {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathname = usePathname()
    const togglePreviousTasks = params.get('togglePreviousTasks') === "true" ? true : false

    function changeParams() {
        params.set('togglePreviousTasks', togglePreviousTasks ? "false" : "true")

        push(`${pathname}?${params.toString()}`)
    }

    return (
        <Button
            onClick={() => changeParams()}
        >
            {togglePreviousTasks ? <Watch /> : <IdCard />}
            {togglePreviousTasks ? "Show previous tasks" : "Hide previous tasks"}
        </Button>
    )
}
