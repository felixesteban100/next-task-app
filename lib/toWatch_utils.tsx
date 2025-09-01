
import { ToWatch } from "@/app/(main)/to-watch/page";
import { Star, Play, Calendar, Tv, Clock, Check, Tv2 } from "lucide-react"


export const allowedTypes: ToWatch["type"][] = ["anime", "cartoon", "movie", "series", "documentary"];
export const allowedWatchingStates: ToWatch["watching_state"][] = ["completed", "uncompleted", "waiting", "watching"];


export const getTypeColor = (type: ToWatch["type"]) => {
    switch (type) {
        case "movie":
            return "bg-primary text-primary-foreground"
        case "series":
            return "bg-secondary text-secondary-foreground"
        case "anime":
            return "bg-accent text-accent-foreground"
        default:
            return "bg-muted text-muted-foreground"
    }
}

export const getTypeIcon = (type: ToWatch["type"]) => {
    switch (type) {
        case "movie":
            return <Play className="w-3 h-3" />
        case "series":
            return <Calendar className="w-3 h-3" />
        case "anime":
            return <Star className="w-3 h-3" />
        case "cartoon":
            return <Tv2 className="w-3 h-3" />
        default:
            return null
    }
}

export const getTypeTextColor = (type: ToWatch["type"]) => {
    switch (type) {
        case "movie":
            return "text-black"
        case "series":
            return "text-orange-500"
        case "anime":
            return "text-blue-500"
        default:
            return "bg-muted text-muted-foreground"
    }
}

export const getWatchingColor = (type: ToWatch["watching_state"]) => {
    switch (type) {
        case "completed":
            return "bg-green-500 text-foreground"
        case "uncompleted":
            return "bg-red-500 text-foreground"
        case "waiting":
            return "bg-yellow-500 text-foreground"
        case "watching":
            return "bg-blue-500 text-foreground"
        default:
            return "bg-muted text-foreground"
    }
}

export const getWatchingIcon = (type: ToWatch["watching_state"]) => {
    switch (type) {
        case "completed":
            return <Check className="w-3 h-3" />
        case "uncompleted":
            return <Calendar className="w-3 h-3" />
        case "waiting":
            return <Clock className="w-3 h-3" />
        case "watching":
            return <Tv className="w-3 h-3" />
        default:
            return null
    }
}
