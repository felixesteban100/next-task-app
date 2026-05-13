import DayOffSelector from "@/components/DayOffSelector";
import { collectionDayOff } from "@/db/mongodb/mongodb";

export default async function page() {
    const dayOff = await collectionDayOff.findOne();

    const id = dayOff?.dayId || 6;

    return (
        <div className="flex flex-col gap-5 justify-center items-center">
            <h1 className="text-2xl font-bold">Day Off</h1>
            <DayOffSelector dayOff={id} />
        </div>
    )
}
