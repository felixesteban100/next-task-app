import { AnimatedTestimonialsDemo } from "@/components/animated-testimonials";
import Tasks from "@/components/TaskToEdit";
import { collectionTask } from "@/db/mongodb/mongodb";
import { getTodaysDate } from "@/lib/utils";
import { connection } from "next/server";

export default async function Home() {
  connection()

  const today = getTodaysDate()
  const ToDayInfo = await collectionTask.findOne({ date: today })

  return (
    <>
      {ToDayInfo ?
        <Tasks dayInfo={JSON.parse(JSON.stringify(ToDayInfo))} />
        :
        <p className="font-semibold text-2xl">{today} tasks were not added the database</p>
      }
      <AnimatedTestimonialsDemo />
    </>
  );
}
