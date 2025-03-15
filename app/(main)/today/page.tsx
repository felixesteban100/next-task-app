import Tasks from "@/components/TaskToEdit";
import { collectionTask } from "@/db/mongodb/mongodb";
import { getTodaysDate } from "@/lib/utils";

// add auth to the app (clerk)
// disable cache for all pages

export default async function Home() {
  const today = getTodaysDate()
  const ToDayInfo = await collectionTask.findOne({ date: today })

  return (
    <>
      {ToDayInfo ?
        <Tasks dayInfo={JSON.parse(JSON.stringify(ToDayInfo))} />
        :
        <p className="font-semibold text-2xl">{today} tasks were not added the database</p>
      }
    </>
  );
}
