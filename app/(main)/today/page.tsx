import NightChecklist from "@/components/NightChecklist";
import Tasks from "@/components/TaskToEdit";
import { collectionTask, collectionThingsToWatchAtNight } from "@/db/mongodb/mongodb";
import {
  DateString,
  getFormattedTime
} from "@/lib/utils";
import { ObjectId } from "mongodb";
import { connection } from "next/server";

export type ReflectionQuestions = {
  reflectionQuestions: string[]
}

export default async function Home({
  searchParams
}: {
  searchParams?: Promise<{
    organizeByTime?: string;
    hideOccupied?: string;
    togglePreviousTasks?: string;
  }>,
}) {
  connection()

  const { hideOccupied, togglePreviousTasks, organizeByTime } = searchParams ? await searchParams : {};

  // // For querying "today's tasks"
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);          // local midnight

  /* date: todayStart  */
  const ToDayInfo = await collectionTask.findOne(
    {},
    { sort: { date: -1 } }
  );

  const thingsToWatchAtNight = await collectionThingsToWatchAtNight.findOne();

  const documentId = new ObjectId(ToDayInfo?._id); // Example _id
  const timestamp = documentId.getTimestamp(); // Get the creation timestamp

  const formattedTime = getFormattedTime(timestamp);

  return (
    <>
      {ToDayInfo ?
        <>
          <Tasks dayInfo={JSON.parse(JSON.stringify(ToDayInfo))} hourAdded={formattedTime} organizeByTime={organizeByTime === "true"} hideOccupied={hideOccupied === "true"} togglePreviousTasks={togglePreviousTasks === "true"} />

          <NightChecklist resources={thingsToWatchAtNight?.resources ?? []} />
          {/* <div className="flex flex-col gap-5 justify-center items-center">
            <h1 className="font-bold">GODLY NIGHT ROUTINE! ✅😀</h1>
            <ol className="list-decimal pl-6">
              <li><span className="font-semibold">Be Free</span> (from technology and the world) Turn off TV, leave cellphone charging in the couch</li>
              <li><span className="font-semibold">Brush teeth</span> and <span className="font-semibold">think of 3 things:</span>
                <ul className="pl-12 list-disc">
                  <li>What went well today?</li>
                  <li>What can be improved tomorrow?</li>
                  <li>What am I thankful for today?</li>
                </ul>
              </li>
              <li className="font-semibold">Read some Bible</li>
              <li><span className="font-semibold">Pray and thank God</span> for the day (Kneel down or put hands together)</li>
            </ol>
          </div> */}
        </>
        :
        <p className="font-semibold text-2xl">{DateString(todayStart)} tasks were not added the database</p>
      }
    </>
  );
}
