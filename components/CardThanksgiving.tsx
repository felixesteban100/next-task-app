"use client"

import { Thanksgiving } from "@/app/(main)/thanksgivings/page"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
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
        <Card className="relative w-full py-6 gap-6 pt-0 flex flex-col justify-between items-center">
            <div className="relative w-full aspect-video">
                <Image
                    src={img}
                    alt={`Image for ${name}`}
                    fill
                    className="object-cover"
                />
            </div>
            <CardHeader className="w-full">
                <CardAction>
                    <Badge variant="secondary">{typeof date === "string" ? date : DateString(date)}</Badge>
                </CardAction>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardContent>

            <CardFooter>
                {/* make this button do something: can be a  */}
                <Button className="w-full">PRAISE THE LORD!!! 🙌🙏</Button>
            </CardFooter>
        </Card>
    )
}
