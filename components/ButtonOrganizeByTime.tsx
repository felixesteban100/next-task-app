"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'

export default function ButtonOrganizeByTime() {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathname = usePathname()
    const organizeByTime = params.get('organizeByTime') === "true" ? true : false

    function changeParams() {
        params.set('organizeByTime', organizeByTime ? "false" : "true")

        push(`${pathname}?${params.toString()}`)
    }

    return (
        <Button
            onClick={() => changeParams()}
        >
            {organizeByTime ? "Organized by time" : "Organized by task id"}
        </Button>
    )
}
