import Tasks from "@/components/TaskToEdit";
import { collectionTask } from "@/db/mongodb/mongodb";
import { getTodaysDate } from "@/lib/utils";

// create and add a mongodb database to store each day
// store in the localstorage the data in the day
// pass 11 pm save the tracked progress from localstorage into the database

// make another page where I see the passed days in an accordion and each tasks state
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
