"use client"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

export default function QueryTasks({ searchValue }: { searchValue: string }) {
    const [search, setSearch] = useState(searchValue)

    const { push } = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const pathname = usePathname()

    function changeParams() {
        params.set('search', search)

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
            <Button onClick={() => changeParams()}><Search /></Button>
        </div>
    )
}
