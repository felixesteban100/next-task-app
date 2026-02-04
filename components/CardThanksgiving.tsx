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
        <Card className="relative mx-auto w-full max-w-sm py-6 gap-6  pt-0 ">
            {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" /> */}
            <Image
                src={img}
                alt="Event cover"
                width={400}
                height={225}
                /* brightness-60 grayscale dark:brightness-40 */
                className="relative z-20 aspect-video w-full object-cover "
            />
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
