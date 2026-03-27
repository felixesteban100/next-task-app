"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { ReactNode } from 'react'

type ReusableToggleButtonProps = {
    paramKey: string
    iconOn: ReactNode
    iconOff: ReactNode
    labelOn: string
    labelOff: string
    tooltip?: string
}

export default function ReusableToggleButton({ paramKey, iconOn, iconOff, labelOn, labelOff, tooltip }: ReusableToggleButtonProps) {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathname = usePathname()
    const isOn = params.get(paramKey) === "true"

    function changeParams() {
        params.set(paramKey, isOn ? "false" : "true")
        push(`${pathname}?${params.toString()}`)
    }

    const button = (
        <Button onClick={changeParams} /* size={tooltip ? "icon" : "default"} */ className="text-xs sm:text-sm">
            {isOn ? iconOn : iconOff}
            {/* Only show label if no tooltip (icon-only mode) */}
            {/* !tooltip && */ <span className="hidden md:inline">{isOn ? labelOn : labelOff}</span>}
            {/* !tooltip && */ <span className="hidden">{isOn ? iconOn : iconOff}</span>}
        </Button>
    )

    // if (!tooltip) return button

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent><p>{tooltip}</p></TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}