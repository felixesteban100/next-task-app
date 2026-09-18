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
import { Input } from './ui/input'

export default function FilterToWatch() {
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
    const [sortBy, setSortBy] = useState<string>(params.get("sortBy")?.toString() ?? "uploaded")
    const [name, setName] = useState<string>(params.get("name")?.toString() ?? "")
    const [direction, setDirection] = useState<string>(params.get("direction")?.toString() ?? "-1")

    function changeParams() {
        params.set('types', types.toString())
        params.set('watchingStates', watchingStates.toString())
        params.set('sortBy', sortBy.toString())
        params.set('direction', direction.toString())
        params.set('name', name.toString())
        push(`${pathname}?${params.toString()}`)
    }

    function clearParams() {
        params.delete('types')
        setTypes([])
        params.delete('watchingStates')
        setWatchingStates([])
        params.delete('sortBy')
        setSortBy("uploaded")
        params.delete('direction')
        setDirection("-1")
        params.delete('name')
        setName("")
        push(`${pathname}?${params.toString()}`)
    }

    const sortByValues = ["uploaded", "name", "random", "rating", "release_year",]
    const sortDirections = [{
        name: "Ascending",
        value: "1"
    }, {
        name: "Descending",
        value: "-1"
    }]

    return (
        <div className='w-full flex flex-col md:flex-row justify-between items-center gap-5'>
            <Input className="w-full max-w-[400px]" placeholder="Search..." value={name} onChange={(e) => setName(e.target.value)} />
            <MultiSelect defaultValues={[]} values={types} onValuesChange={(values) => setTypes(values)}>
                <MultiSelectTrigger className="w-full max-w-[200px] capitalize">
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
                <MultiSelectTrigger className="w-full max-w-[200px] capitalize ">
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
                    <Button variant={'secondary'} size={'icon'} className="">
                        {
                            direction === "1" ? <SortDesc className='transition-all duration-300 rotate-180' /> : <SortDesc />
                        }
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Sort by:</DropdownMenuLabel>
                    {sortDirections.map((sortDirection) => {
                        return (
                            <Button
                                key={sortDirection.value}
                                variant={'ghost'}
                                className={`${direction === sortDirection.value ? "text-primary font-bold" : ""} capitalize`}
                                onClick={() => setDirection(sortDirection.value)}
                            >
                                {sortDirection.name}
                            </Button>
                        )
                    })}
                    <DropdownMenuSeparator />
                    {sortByValues.map(value => {
                        return (
                            <DropdownMenuItem
                                key={value}
                                className={`${sortBy === value ? "text-primary font-bold" : ""} capitalize`}
                                onClick={() => setSortBy(value)}
                            >
                                {value.replace("_", " ")}
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
            <div className='flex justify-between items-center gap-2'>
                <Button onClick={() => changeParams()}><Search /></Button>
                <Button onClick={() => clearParams()}><X /></Button>
            </div>
        </div>
    )
}
