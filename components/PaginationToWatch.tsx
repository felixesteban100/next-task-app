"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination"

export default function PaginationToWatch({ totalItems, itemsPerPage, pageValue }: { totalItems: number, itemsPerPage: number, pageValue: number }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const searchParams = useSearchParams()

    const buildHref = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", page.toString())
        return `?${params.toString()}`
    }

    return (
        <Pagination>
            <PaginationContent>
                {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink href={buildHref(i + 1)} isActive={i + 1 === pageValue} scroll={false}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
            </PaginationContent>
        </Pagination>
    )
}