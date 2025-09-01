

"use client"

import { Card/* , CardContent */ } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { Star } from "lucide-react"
import Image from "next/image"
import { ToWatch } from "@/app/(main)/to-watch/page"
import { /* getTypeColor, getTypeIcon, getTypeTextColor,  */getWatchingColor, getWatchingIcon } from "@/lib/toWatch_utils"
interface MediaCardProps {
    media: ToWatch
}

export function MediaCard({ media }: MediaCardProps) {
    return (
        <Card
            className="group max-h-[25rem] w-[15rem] group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-card border-border"
        >
            <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                    src={media.img_portrait || "/placeholder.svg"}
                    alt={`${media.name} poster`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    width={500}
                    height={500}
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
                <Badge className={`absolute top-2 right-2 gap-1 ${getWatchingColor(media.watching_state)}`}>
                    {getWatchingIcon(media.watching_state)}
                    {media.watching_state.charAt(0).toUpperCase() + media.watching_state.slice(1)}
                </Badge>
            </div>

            {/* <CardContent className="translate-y-[150px] group-hover:translate-y-0 p-0 group-hover:p-4 group-hover:space-y-2 transition-all duration-200">
                <h3 className={`hidden group-hover:block font-bold text-lg leading-tight text-card-foreground line-clamp-1 group-hover:${getTypeTextColor(media.type)} transition-colors`}>
                    {media.name}
                </h3>
                <Badge className={`hidden group-hover:flex justify-center w-full gap-1 ${getTypeColor(media.type)}`}>
                    {getTypeIcon(media.type)}
                    {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
                </Badge>

                <div className="hidden group-hover:flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-sm text-foreground">{media.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">{media.release_year} - {media.end_year}</span>
                </div>

                <div className="hidden group-hover:flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-medium">{media.rated}</span>
                    <div>
                        {media.seasons && <span className="text-xs text-muted-foreground">S{media.seasons}</span>}
                        <span> - </span>
                        {media.episodes && <span className="text-xs text-muted-foreground">{media.episodes} episodes</span>}
                    </div>
                </div>
            </CardContent> */}
        </Card >
    )
}
