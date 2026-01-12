import FilterToWatch from "@/components/FilterToWatch";
import { collectionToWatch } from "@/db/mongodb/mongodb"
import { connection } from "next/server";


// import { Badge } from "@/components/ui/badge";
import { allowedTypes, allowedWatchingStates } from "@/lib/toWatch_utils";
import WatchToEdit from "@/components/WatchToEdit";

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
    description: string
}


export default async function ToWatchPage({
    searchParams
}: {
    searchParams?: Promise<{
        types?: string;
        watchingStates?: string;
        sortBy?: string
    }>,
}) {
    connection()

    const { types, watchingStates, sortBy } = searchParams ? await searchParams : {};
    const typesValue = types ? types : ""
    const watchingStatesValue = watchingStates ? watchingStates : ""
    const sortByValue = sortBy ? sortBy : "random"

    // add a way to filter by type and state (I think by name won't be necessary)
    // unlock series and movies by good streak of days not sinning, eg: last 7 days didn't sin, unlock animes

    const typeArray = typesValue.split(',').filter(c => c != "") as typeof allowedTypes[number][]

    const watchingStateArray = watchingStatesValue.split(',').filter(c => c != "") as typeof allowedWatchingStates[number][]

    const queryToWatch = {
        ...(typeArray && typeArray.length > 0 ? { type: { $in: typeArray } } : {}),
        ...(watchingStateArray && watchingStateArray.length > 0 ? { watching_state: { $in: watchingStateArray } } : {}),
    }

    // console.log(queryToWatch)

    function shuffle<T>(array: T[]): T[] {
        return array.sort(() => Math.random() - 0.5);
    }

    const toWatch = await collectionToWatch
        .find(queryToWatch)
        .sort(sortByValue === "name" ? { name: 1 } : { _id: -1 })
        .toArray()


    // const seriesAndMovies = {};

    // for (let i = 0; i < Object.entries(seriesAndMovies).length; i++) {
    //     const [key, value] = Object.entries(seriesAndMovies)[i];

    //     console.log(key)

    //     await collectionToWatch.updateOne(
    //         { name: key },
    //         {
    //             $set: {
    //                 description: value,
    //             },
    //         },
    //     );
    // }

    return (
        <div className="w-full flex flex-col px-10 space-y-5 items-center">
            <h1 className="text-3xl font-bold mb-4">To Watch List</h1>
            <FilterToWatch />
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {(sortByValue === "random" ? shuffle(toWatch) : toWatch).map((media) => (
                    <WatchToEdit
                        key={media._id.toString()}
                        media={JSON.parse(JSON.stringify(media)) as ToWatch}
                    />
                ))}
            </div>
        </div>
    )
}

{/* <DialogContent className="w-screen">
                            <DialogHeader>
                                <DialogTitle>{media.name}</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-row gap-4">
                                <div className="relative aspect-[2/3] overflow-hidden max-h-90 w-fit">
                                    <Image
                                        src={media.img_portrait || "/placeholder.svg"}
                                        alt={`${media.name} poster`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        width={500}
                                        height={500}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Badge className={`w-fit gap-1 ${media.type === "anime" ? "bg-purple-500 text-foreground" : media.type === "cartoon" ? "bg-pink-500 text-foreground" : media.type === "movie" ? "bg-blue-500 text-foreground" : media.type === "series" ? "bg-green-500 text-foreground" : media.type === "documentary" ? "bg-yellow-500 text-foreground" : "bg-muted text-foreground"}`}>
                                        {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
                                    </Badge>
                                    <div>
                                        {allowedWatchingStates.map((state) => {
                                            return (
                                                <Badge key={state} className={`w-fit gap-1 capitalize ${state === media.watching_state ? "opacity-100" : "opacity-70"} ${state === "completed" ? "bg-green-500 text-foreground" : state === "uncompleted" ? "bg-red-500 text-foreground" : state === "waiting" ? "bg-yellow-500 text-foreground" : state === "watching" ? "bg-blue-500 text-foreground" : "bg-muted text-foreground"}`}>
                                                    {state}
                                                </Badge>
                                            )
                                        })}
                                    </div>
                                    <p><span className="font-bold">Seasons:</span> {media.seasons}</p>
                                    <p><span className="font-bold">Episodes:</span> {media.episodes}</p>
                                    <p><span className="font-bold">Rated:</span> {media.rated}</p>
                                    <p><span className="font-bold">Release Year:</span> {media.release_year}</p>
                                    <p><span className="font-bold">End Year:</span> {media.end_year}</p>
                                    <p><span className="font-bold">Rating:</span> {media.rating}</p>
                                    <a href={media.url_last_watched} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                        Go to last watched episode
                                    </a>
                                </div>
                            </div>
                        </DialogContent> */}