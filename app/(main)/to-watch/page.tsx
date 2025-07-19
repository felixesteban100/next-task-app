import { collectionToWatch } from "@/db/mongodb/mongodb"
import Image from "next/image"


export type ToWatch = {
    name: string
    url_last_watched: string,
    img_portrait: string,
    // logo: string,
    seasons: number,
    watching_state: "completed" | "uncompleted" | "waiting" | "watching",
    type: "anime" | "cartoon" | "movie" | "series" | "documentary",
    rated: "G" | "PG" | "PG-13" | "R" | "NC-17"
    // main_characters: { name: string, image: string }[]
}

export default async function page() {
    // add a way to filter by type and state (I think by name won't be necessary)
    const toWatch = await collectionToWatch.find().toArray()

    return (
        <div className="w-full px-10">
            <h1 className="text-3xl font-bold mb-4">To Watch List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {toWatch.map((item) => (
                    <div key={item._id?.toString() ?? item.name}>
                        <Image src={item.img_portrait} alt={item.name} className="w-full h-[30rem] rounded-lg mb-4" width={1000} height={1000} />
                        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                        <p className="mb-1">Type: {item.type}</p>
                        <p className="mb-1">State: {item.watching_state}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
