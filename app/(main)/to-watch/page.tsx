import { MediaCard } from "@/components/media-card"
import { collectionToWatch } from "@/db/mongodb/mongodb"
import { connection } from "next/server";

export const dynamic = 'force-dynamic';

export type ToWatch = {
    name: string
    url_last_watched: string,
    img_portrait: string,
    // logo: string,
    seasons: number,
    episodes: number,
    watching_state: "completed" | "uncompleted" | "waiting" | "watching",
    type: "anime" | "cartoon" | "movie" | "series" | "documentary",
    rated: "G" | "PG" | "PG-13" | "R" | "NC-17"
    release_year: string,
    end_year: string,
    rating: number,
    // main_characters: { name: string, image: string }[]
}

export default async function ToWatchPage() {
    connection()

    // add a way to filter by type and state (I think by name won't be necessary)
    const toWatch = await collectionToWatch.find().toArray()

    return (
        <div className="w-full px-10">
            <h1 className="text-3xl font-bold mb-4">To Watch List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {toWatch.map((media) => (
                    <MediaCard key={media.name} media={JSON.parse(JSON.stringify(media))} />
                ))}
            </div>
        </div>
    )
}


/* 
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {toWatch.map((item) => (
                    <div key={item._id?.toString() ?? item.name} className="relative">
                        <Image src={item.img_portrait} alt={item.name} className="max-w- h-full rounded-lg mb-4 object-cover" width={1000} height={1000} />
                        <div className="w-full absolute bottom-2 left-2 flex flex-col space-y-1 items-center justify-center">
                            <h2 className="text-md font-semibold bg-background bg-opacity-50 px-2 py-1 rounded">{item.name}</h2>
                            <p className="bg-background bg-opacity-50 px-2 py-1 rounded">Type: {item.type}</p>
                            <p className="bg-background bg-opacity-50 px-2 py-1 rounded">State: {item.watching_state}</p>
                        </div>
                    </div>
                ))}
            </div> */