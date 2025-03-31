import Tasks from "@/components/TaskToEdit";
import { collectionTask } from "@/db/mongodb/mongodb";
import { getTodaysDate } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { connection } from "next/server";

export default async function Home() {
  connection()

  const today = getTodaysDate()
  const ToDayInfo = await collectionTask.findOne({ date: today })

  const documentId = new ObjectId(ToDayInfo?._id); // Example _id
  const timestamp = documentId.getTimestamp(); // Get the creation timestamp

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(timestamp);

  return (
    <>
      {ToDayInfo ?
        <Tasks dayInfo={JSON.parse(JSON.stringify(ToDayInfo))} hourAdded={formattedTime} />
        :
        <p className="font-semibold text-2xl">{today} tasks were not added the database</p>
      }
      <p className="font-semibold text-xl ">Today ({today}) is <span className="text-red-400">not a day to sin</span> but is <span className="text-green-400">a day to live for God.</span> Amen.</p>
      <ul className=" text-xl mb-10 list-disc">
        <li>Open clock app</li>
        <li>Turn off TV</li>
        <li>Wrap yourself up in the blanket</li>
        <li>Thank God for this day, and for forgiveness of today&apos;s sins</li>
      </ul>
    </>
  );
}
