import { Suspense } from "react"
import FilterToWatch from "@/components/FilterToWatch";
import { connection } from "next/server";
import WatchGrid from "@/components/WatchGrid";
import WatchGridSkeleton from "@/components/WatchGridSkeleton";

export const dynamic = 'force-dynamic';

export type ToWatch = {
    name: string
    url_last_watched: string,
    img_portrait: string,
    seasons: number,
    episodes: number,
    watching_state: "completed" | "uncompleted" | "waiting" | "watching",
    type: "anime" | "cartoon" | "movie" | "series" | "documentary",
    rated: "G" | "PG" | "PG-13" | "R" | "NC-17" | "TV-Y" | "TV-Y7" | "TV-G" | "TV-PG" | "TV-14" | "TV-MA",
    release_year: string,
    end_year: string,
    rating: number,
    description: string;
    movies: {
        name: string;
        description: string;
        img_portrait: string;
        rated: "G" | "PG" | "PG-13" | "R" | "NC-17";
        release_year: string;
        rating: number;
        duration: string;
    }[];
}

type ToWatchSearchParams = {
    types?: string;
    watchingStates?: string;
    sortBy?: string;
    page?: string;
    direction?: string;
    name?: string;
}

export default async function ToWatchPage({
    searchParams
}: {
    searchParams?: Promise<ToWatchSearchParams>,
}) {
    connection()

    const params = searchParams ? await searchParams : {};

    return (
        <div className="max-w-[1200px] flex flex-col space-y-5 items-center">
            <FilterToWatch />
            <Suspense key={JSON.stringify(params)} fallback={<WatchGridSkeleton />}>
                <WatchGrid {...params} />
            </Suspense>
        </div>
    )
}