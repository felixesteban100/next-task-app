

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"
import { ToWatch } from "@/app/(main)/to-watch/page"
import { getTypeColor, getTypeIcon, getWatchingColor, getWatchingIcon } from "@/lib/toWatch_utils"

interface MediaCardProps {
    media: ToWatch
}

export function MediaCard({ media }: MediaCardProps) {
    return (
        <Card
            className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card border-border"
        >
            <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                    src={media.img_portrait || "/placeholder.svg"}
                    alt={`${media.name} poster`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    width={500}
                    height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className={`absolute top-2 right-2 gap-1 ${getTypeColor(media.type)}`}>
                    {getTypeIcon(media.type)}
                    {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
                </Badge>
            </div>

            <CardContent className="p-4 space-y-2">
                <h3 className="font-bold text-lg leading-tight text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {media.name}
                </h3>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-sm text-foreground">{media.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">•</span>
                    <span className="text-muted-foreground text-sm">{media.release_year} - {media.end_year}</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground font-medium">{media.rated}</span>
                    <div>
                        {media.seasons && <span className="text-xs text-muted-foreground">S{media.seasons}</span>}
                        <span> - </span>
                        {media.episodes && <span className="text-xs text-muted-foreground">{media.episodes} episodes</span>}
                    </div>
                </div>

                <Badge className={`capitalize gap-1 ${getWatchingColor(media.watching_state)}`}>
                    {getWatchingIcon(media.watching_state)}
                    {media.watching_state}
                </Badge>
            </CardContent>
        </Card>
    )
}
