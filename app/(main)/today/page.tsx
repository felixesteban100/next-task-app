import { AnimatedTestimonialsDemo } from "@/components/animated-testimonials";
import Tasks from "@/components/TaskToEdit";
import { collectionTask } from "@/db/mongodb/mongodb";
import { getTodaysDate } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { connection } from "next/server";

export default async function Home() {
  connection()

  const today = getTodaysDate()
  const ToDayInfo = await collectionTask.findOne({ date: today })

  const now = new Date();
  const hoursNow = now.getHours();
  const isNightTime = hoursNow >= 21 || hoursNow < 6;

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
      {isNightTime ? <AnimatedTestimonialsDemo /> : null}
    </>
  );
}
