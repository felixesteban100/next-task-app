import FilterToWatch, { allowedTypes, allowedWatchingStates } from "@/components/FilterToWatch";
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



export default async function ToWatchPage({
    searchParams
}: {
    searchParams?: Promise<{
        types?: string;
        watchingStates?: string;
    }>,
}) {
    connection()

    const { types, watchingStates } = searchParams ? await searchParams : {};
    const typesValue = types ? types : ""
    const watchingStatesValue = watchingStates ? watchingStates : ""

    // add a way to filter by type and state (I think by name won't be necessary)

    const typeArray = typesValue.split(',').filter(c => c != "") as typeof allowedTypes[number][]

    const watchingStateArray = watchingStatesValue.split(',').filter(c => c != "") as typeof allowedWatchingStates[number][]

    const queryToWatch = {
        ...(typeArray.length > 0 ? { type: { $in: typeArray } } : {}),
        ...(watchingStateArray.length > 0 ? { watching_state: { $in: watchingStateArray } } : {}),
    }

    const toWatch = await collectionToWatch
        .find(queryToWatch)
        .sort({ _id: -1 })
        .toArray()

    return (
        <div className="w-full flex flex-col px-10 space-y-5 items-center">
            <h1 className="text-3xl font-bold mb-4">To Watch List</h1>
            <FilterToWatch />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {toWatch.map((media) => (
                    <MediaCard key={media.name} media={JSON.parse(JSON.stringify(media))} />
                ))}
            </div>
        </div>
    )
}