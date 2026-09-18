import { collectionToWatch } from "@/db/mongodb/mongodb"
import { allowedTypes, allowedWatchingStates } from "@/lib/toWatch_utils";
import WatchToEdit from "@/components/WatchToEdit";
import PaginationToWatch from "@/components/PaginationToWatch";
import { ToWatch } from "@/app/(main)/to-watch/page";

export default async function WatchGrid({
    types,
    watchingStates,
    sortBy,
    page,
    direction,
    name,
}: {
    types?: string;
    watchingStates?: string;
    sortBy?: string;
    page?: string;
    direction?: string;
    name?: string;
}) {
    const typesValue = types ? types : ""
    const watchingStatesValue = watchingStates ? watchingStates : ""
    const sortByValue = sortBy ? sortBy : "uploaded"
    const pageValue = page ? parseInt(page) : 1
    const directionValue = direction ? (parseInt(direction) === 1 ? 1 : -1) : -1
    const nameValue = name ? name : ""

    const typeArray = typesValue.split(',').filter(c => c != "") as typeof allowedTypes[number][]
    const watchingStateArray = watchingStatesValue.split(',').filter(c => c != "") as typeof allowedWatchingStates[number][]

    const queryToWatch = {
        ...(nameValue && nameValue !== "" ? { name: { $regex: nameValue.trim(), $options: "i" } } : {}),
        ...(typeArray && typeArray.length > 0 ? { type: { $in: typeArray } } : {}),
        ...(watchingStateArray && watchingStateArray.length > 0 ? { watching_state: { $in: watchingStateArray } } : {}),
    }

    function shuffle<T>(array: T[]): T[] {
        return array.sort(() => Math.random() - 0.5);
    }

    const howManyPerPage = 12

    const toWatch = await collectionToWatch
        .find(queryToWatch)
        .skip((pageValue - 1) * howManyPerPage)
        .limit(howManyPerPage)
        .sort({ [sortByValue === "uploaded" ? "_id" : sortByValue]: directionValue })
        .toArray()

    const totalItems = await collectionToWatch.countDocuments(queryToWatch)

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {(sortByValue === "random" ? shuffle(toWatch) : toWatch).map((media) => (
                    <WatchToEdit
                        key={media._id.toString()}
                        media={JSON.parse(JSON.stringify(media)) as ToWatch}
                    />
                ))}
            </div>
            <PaginationToWatch totalItems={totalItems} itemsPerPage={howManyPerPage} pageValue={pageValue} />
        </>
    )
}