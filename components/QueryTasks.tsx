"use client"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'

export default function QueryTasks({ searchValue, dayValue }: { searchValue: string, dayValue: string }) {
    const [search, setSearch] = useState(searchValue)
    const [day, setDay] = useState(dayValue)

    const { push } = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathname = usePathname()

    function changeParams() {
        params.set('search', search)
        params.set('day', day)
        push(`${pathname}?${params.toString()}`)
    }

    function clearParams() {
        params.delete('search')
        setSearch('')
        params.delete('day')
        setDay('all')
        push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className='flex items-center justify-center gap-4 mb-4 w-full px-4'>
            <Input
                type="text"
                placeholder="Search by task name..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
                className='w-[45%] '
            />
            <Select defaultValue="all" value={day} onValueChange={(value) => {
                setDay(value)
            }}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Days</SelectLabel>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Monday">Monday</SelectItem>
                        <SelectItem value="Tuesday">Tuesday</SelectItem>
                        <SelectItem value="Wednesday">Wednesday</SelectItem>
                        <SelectItem value="Thursday">Thursday</SelectItem>
                        <SelectItem value="Friday">Friday</SelectItem>
                        <SelectItem value="Saturday">Saturday</SelectItem>
                        <SelectItem value="Sunday">Sunday</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className='flex items-center gap-2'>
                <Button onClick={() => changeParams()}><Search /></Button>
                <Button onClick={() => clearParams()}><X /></Button>
            </div>
        </div>
    )
}
