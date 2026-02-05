"use client"

import { Thanksgiving } from "@/app/(main)/thanksgivings/page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DateString } from "@/lib/utils"
import Image from "next/image"

export function CardThanksgiving({ thanksgiving }: { thanksgiving: Thanksgiving }) {
    const { date, description, img, name } = thanksgiving

    return (
        <Card className="relative w-full py-6 gap-6 pt-0">
            <div className="relative w-full aspect-video">
                <Image
                    src={img}
                    alt={`Image for ${name}`}
                    fill
                    className="object-cover"
                />
            </div>
            <CardHeader>
                <CardAction>
                    <Badge variant="secondary">{typeof date === "string" ? date : DateString(date)}</Badge>
                </CardAction>
                <CardTitle>{name}</CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full">PRAISE THE LORD!!! 🙌🙏</Button>
            </CardFooter>
        </Card>
    )
}
