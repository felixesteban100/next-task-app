"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Button } from './ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'


export default function ButtonHideOccupied() {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathname = usePathname()
    const hideOccupied = params.get('hideOccupied') === "true" ? true : false

    function changeParams() {
        params.set('hideOccupied', hideOccupied ? "false" : "true")

        push(`${pathname}?${params.toString()}`)
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button onClick={() => changeParams()} size={"icon"}>
                        {hideOccupied ? <EyeOff /> : <Eye />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Hide actual name for occupied tasks</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
