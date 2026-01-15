"use client"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronDownIcon, Search, X } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export default function QueryTasks({ searchValue, dayValue, fromDateValue }: { searchValue: string, dayValue: string, fromDateValue: Date }) {
    const [search, setSearch] = useState(searchValue)
    const [day, setDay] = useState(dayValue)
    const [open, setOpen] = useState(false)
    const [fromDate, setFromDate] = useState(fromDateValue)

    const { push } = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathname = usePathname()

    function changeParams() {
        params.set('search', search)
        params.set('day', day)
        params.set('fromDate', fromDate.toString())
        push(`${pathname}?${params.toString()}`)
    }

    function clearParams() {
        params.delete('search')
        setSearch('')
        params.delete('day')
        setDay('all')
        params.delete('fromDate')
        setFromDate(new Date(Date.now() - 7 * 86400000)) // Seven days ago (86400000 = 24×60×60×1000 milliseconds in a day)
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
            {/* filter by range dates */}
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
            <div className="flex flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date"
                            className="w-48 justify-between font-normal"
                        >
                            {fromDate ? fromDate.toLocaleDateString()/* DateString(fromDate) */ : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={fromDate}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                if (date) {
                                    const dateValue = new Date(date)
                                    setFromDate(dateValue)
                                    setOpen(false)
                                }
                            }}
                            disabled={(date) => date > new Date()}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className='flex items-center gap-2'>
                <Button onClick={() => changeParams()}><Search /></Button>
                <Button onClick={() => clearParams()}><X /></Button>
            </div>
        </div>
    )
}
