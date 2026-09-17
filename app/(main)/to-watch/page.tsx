import FilterToWatch from "@/components/FilterToWatch";
import { collectionToWatch } from "@/db/mongodb/mongodb"
import { connection } from "next/server";


// import { Badge } from "@/components/ui/badge";
import { allowedTypes, allowedWatchingStates } from "@/lib/toWatch_utils";
import WatchToEdit from "@/components/WatchToEdit";
import PaginationToWatch from "@/components/PaginationToWatch";

export const dynamic = 'force-dynamic';

// const movies = movies: z.array(z.object({
//             name: z.string().min(2, {
//                 message: "Name must be at least 2 characters.",
//             }),
//             url_last_watched: z.string().url({
//                 message: "You must provide a valid URL.",
//             }),
//             img_portrait: z.string().min(2, {
//                 message: "Username must be at least 2 characters.",
//             }),
//             watching_state: z.enum(allowedWatchingStates as [string, ...string[]], {
//                 errorMap: () => ({ message: "You must select a valid state." }),
//             }),
//             type: z.enum(allowedTypes as [string, ...string[]], {
//                 errorMap: () => ({ message: "You must select a valid type." }),
//             }),
//             rated: z.enum(["G", "PG", "PG-13", "R", "NC-17"] as [string, ...string[]], {
//                 errorMap: () => ({ message: "You must select a valid rating." }),
//             }),
//             release_year: z.string().min(4),
//             rating: z.number().min(0).max(10),
//         })).optional(),

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
    description: string;
    // an array of the movies of that series, anime or cartoon, with the same info as a single media but without seasons and episodes, and with an extra field of season number, so you can edit them separately if you want to
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


export default async function ToWatchPage({
    searchParams
}: {
    searchParams?: Promise<{
        types?: string;
        watchingStates?: string;
        sortBy?: string;
        page?: string;
    }>,
}) {
    connection()

    const { types, watchingStates, sortBy, page } = searchParams ? await searchParams : {};
    const typesValue = types ? types : ""
    const watchingStatesValue = watchingStates ? watchingStates : ""
    const sortByValue = sortBy ? sortBy : "random"
    const pageValue = page ? parseInt(page) : 1

    // add a way to filter by type and state (I think by name won't be necessary)
    // unlock series and movies by good streak of days not sinning, eg: last 7 days didn't sin, unlock animes

    const typeArray = typesValue.split(',').filter(c => c != "") as typeof allowedTypes[number][]

    const watchingStateArray = watchingStatesValue.split(',').filter(c => c != "") as typeof allowedWatchingStates[number][]

    // apply pagination to the query, with 12 items per page, and skip the first (pageValue - 1) * 12 items
    const queryToWatch = {
        ...(typeArray && typeArray.length > 0 ? { type: { $in: typeArray } } : {}),
        ...(watchingStateArray && watchingStateArray.length > 0 ? { watching_state: { $in: watchingStateArray } } : {}),
    }

    // console.log(queryToWatch)

    function shuffle<T>(array: T[]): T[] {
        return array.sort(() => Math.random() - 0.5);
    }

    const howManyPerPage = 5

    const toWatch = await collectionToWatch
        .find(queryToWatch)
        .skip((pageValue - 1) * howManyPerPage)
        .limit(howManyPerPage)
        .sort(sortByValue === "name" ? { name: 1 } : { _id: -1 })
        .toArray()

    const totalItems = await collectionToWatch.countDocuments(queryToWatch)

    return (
        <div className="w-full flex flex-col px-10 space-y-5 items-center">
            {/* <h1 className="text-3xl font-bold mb-4">To Watch List</h1> */}
            <FilterToWatch />
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {(sortByValue === "random" ? shuffle(toWatch) : toWatch).map((media) => (
                    <WatchToEdit
                        key={media._id.toString()}
                        media={JSON.parse(JSON.stringify(media)) as ToWatch}
                    />
                ))}
            </div>
            <PaginationToWatch totalItems={totalItems} itemsPerPage={howManyPerPage} pageValue={pageValue} />
        </div>
    )
}