"use client"

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from "@/components/ui/multi-select"
import { Search, X } from 'lucide-react'
import { allowedTypes, allowedWatchingStates } from '@/lib/toWatch_utils'

export default function FilterToWatch() {
    // use states for types and watchingStates from url params in first render
    // add filter by name
    // add sorting by: name, release_year, rating,  asc and desc (depending of _id)

    const [types, setTypes] = useState<string[]>([])
    const [watchingStates, setWatchingStates] = useState<string[]>([])

    const { push } = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathname = usePathname()

    function changeParams() {
        params.set('types', types.toString())
        params.set('watchingStates', watchingStates.toString())
        push(`${pathname}?${params.toString()}`)
    }

    function clearParams() {
        params.delete('types')
        setTypes([])
        params.delete('watchingStates')
        setWatchingStates([])
        push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className='w-full flex justify-center gap-5'>
            <MultiSelect defaultValues={[]} values={types} onValuesChange={(values) => setTypes(values)}>
                <MultiSelectTrigger className="w-full max-w-[400px] capitalize">
                    <MultiSelectValue placeholder="Select type..." />
                </MultiSelectTrigger>
                <MultiSelectContent>
                    <MultiSelectGroup className='capitalize'>
                        {allowedTypes.map((type) => (
                            <MultiSelectItem key={type} value={type}>{type}</MultiSelectItem>
                        ))}
                    </MultiSelectGroup>
                </MultiSelectContent>
            </MultiSelect>
            <MultiSelect defaultValues={[]} values={watchingStates} onValuesChange={(values) => setWatchingStates(values)}>
                <MultiSelectTrigger className="w-full max-w-[400px] capitalize ">
                    <MultiSelectValue placeholder="Select watching state..." />
                </MultiSelectTrigger>
                <MultiSelectContent>
                    <MultiSelectGroup className='capitalize'>
                        {allowedWatchingStates.map((watch) => (
                            <MultiSelectItem key={watch} value={watch}>{watch}</MultiSelectItem>
                        ))}
                    </MultiSelectGroup>
                </MultiSelectContent>
            </MultiSelect>
            <div className='flex items-center gap-2'>
                <Button onClick={() => changeParams()}><Search /></Button>
                <Button onClick={() => clearParams()}><X /></Button>
            </div>
        </div>
    )
}
