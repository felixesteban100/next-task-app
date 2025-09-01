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
import { Search, SortDesc, X } from 'lucide-react'
import { allowedTypes, allowedWatchingStates } from '@/lib/toWatch_utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

export default function FilterToWatch() {
    // use states for types and watchingStates from url params in first render
    // add filter by name
    // add sorting by: name, release_year, rating,  asc and desc (depending of _id)

    const { push } = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathname = usePathname()

    const [types, setTypes] = useState<string[]>(
        params.get("types") ? params.get("types")!.split(",").filter(Boolean) : []
    )
    const [watchingStates, setWatchingStates] = useState<string[]>(
        params.get("watchingStates") ? params.get("watchingStates")!.split(",").filter(Boolean) : []
    )
    const [sortBy, setSortBy] = useState<string>(params.get("sortBy")?.toString() ?? "random")

    function changeParams() {
        params.set('types', types.toString())
        params.set('watchingStates', watchingStates.toString())
        params.set('sortBy', sortBy.toString())
        push(`${pathname}?${params.toString()}`)
    }

    function clearParams() {
        params.delete('types')
        setTypes([])
        params.delete('watchingStates')
        setWatchingStates([])
        params.delete('sortBy')
        setSortBy("uploaded")
        push(`${pathname}?${params.toString()}`)
    }

    const sortByValues = ["random", "name", "uploaded"]

    return (
        <div className='w-full flex flex-col md:flex-row justify-center items-center gap-5'>
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'secondary'} size={'icon'}>
                        <SortDesc />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Sort by:</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {sortByValues.map(value => {
                        return (
                            <DropdownMenuItem
                                key={value}
                                className={`${sortBy === value ? "text-primary font-bold" : ""} capitalize`}
                                onClick={() => setSortBy(value)}
                            >
                                {value}
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
            <div className='flex items-center gap-2'>
                <Button onClick={() => changeParams()}><Search /></Button>
                <Button onClick={() => clearParams()}><X /></Button>
            </div>
        </div>
    )
}
