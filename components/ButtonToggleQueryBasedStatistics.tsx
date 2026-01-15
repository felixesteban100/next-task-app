"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'

export default function ButtonToggleQueryBasedStatistics() {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathname = usePathname()
    const queryStatistics = params.get('queryStatistics') === "true" ? true : false

    function changeParams() {
        params.set('queryStatistics', queryStatistics ? "false" : "true")

        push(`${pathname}?${params.toString()}`)
    }

    return (
        <Button
            onClick={() => changeParams()}
        >
            {queryStatistics ? "All time" : "Query based"}
        </Button>
    )
}
