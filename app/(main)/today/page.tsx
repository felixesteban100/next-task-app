import { AnimatedTestimonialsDemo } from "@/components/animated-testimonials";
import Tasks from "@/components/TaskToEdit";
import { collectionReflectionQuestions, collectionTask } from "@/db/mongodb/mongodb";
import { getTodaysDate } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { connection } from "next/server";


export type ReflectionQuestions = {
  reflectionQuestions: string[]
}

export default async function Home() {
  connection()

  const today = getTodaysDate()
  const ToDayInfo = await collectionTask.findOne({ date: today })
  const reflectionQuestions = await collectionReflectionQuestions.findOne()

  const documentId = new ObjectId(ToDayInfo?._id); // Example _id
  const timestamp = documentId.getTimestamp(); // Get the creation timestamp

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(timestamp);


  const getRandomQuestions = (count: number, questions: string[]): string[] => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  return (
    <>
      {ToDayInfo ?
        <>
          <Tasks dayInfo={JSON.parse(JSON.stringify(ToDayInfo))} hourAdded={formattedTime} />

          <div className="flex flex-col gap-5 justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <p className="font-semibold text-xl ">Today ({today}) is <span className="text-red-400">not a day to sin</span> but is <span className="text-green-400">a day to live for God.</span> Amen.</p>
              <p>You need is a peaceful night sleep 🕊🙏😴</p>
              <ul className="list-disc">
                <li>Open clock app</li>
                <li>Turn off TV</li>
                <li>Wrap yourself up in the blanket</li>
                <li>Thank God for this day and for forgiveness of sins</li>
              </ul>
            </div>

            <div className="flex flex-row gap-12 justify-center items-center">
              <AnimatedTestimonialsDemo />
              {
                reflectionQuestions ?
                  <div>
                    <h2 className="font-semibold text-center">Reflection Questions</h2>
                    <ul className="list-disc">
                      {getRandomQuestions(5, reflectionQuestions.reflectionQuestions ?? []).map((question, index) => {
                        return <li key={index}>{question}</li>
                      })}
                    </ul>
                  </div>
                  : null
              }
            </div>
          </div>
        </>
        :
        <p className="font-semibold text-2xl">{today} tasks were not added the database</p>
      }
    </>
  );
}
