// import { AnimatedTestimonialsDemo } from "@/components/animated-testimonials";
import Tasks from "@/components/TaskToEdit";
import { /* collectionReflectionQuestions, */ collectionTask } from "@/db/mongodb/mongodb";
import { DateString/* , getTodaysDate */ } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { connection } from "next/server";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"

export type ReflectionQuestions = {
  reflectionQuestions: string[]
}

export default async function Home({
  searchParams
}: {
  searchParams?: Promise<{
    hideOccupied?: string;
  }>,
}) {
  connection()

  const { hideOccupied } = searchParams ? await searchParams : {};


  // For querying "today's tasks"
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);          // local midnight

  const ToDayInfo = await collectionTask.findOne(
    {},
    { sort: { date: -1 } }
  );

  // const reflectionQuestions = await collectionReflectionQuestions.findOne()

  const documentId = new ObjectId(ToDayInfo?._id); // Example _id
  const timestamp = documentId.getTimestamp(); // Get the creation timestamp

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(timestamp);


  // const getRandomQuestions = (count: number, questions: string[]): string[] => {
  //   const shuffled = [...questions].sort(() => Math.random() - 0.5);
  //   return shuffled.slice(0, count);
  // };

  return (
    <>
      {ToDayInfo ?
        <>
          <Tasks dayInfo={JSON.parse(JSON.stringify(ToDayInfo))} hourAdded={formattedTime} hideOccupied={hideOccupied === "true"} />

          <div className="flex flex-col gap-5 justify-center items-center">
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

            {/* <div className="flex flex-col justify-center items-center">
              <p className="font-semibold text-xl ">Today ({today}) is <span className="text-red-400">not a day to sin</span> but is <span className="text-green-400">a day to live for God.</span> Amen.</p>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="">
                    <div className="flex flex-col gap-2">
                      <p>Your mission is, was and is going to always be to <span className="font-bold text-green-600">life for the glory of God</span></p>
                      <p>That means to do all activities in this list and out of this list <span className="font-bold text-green-600">for the glory of God</span></p>
                      <p>How to achieve that? Do these daily✔</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      <li>🕊🙏😴Have a peaceful night sleep </li>
                      <li>💪🦵🏋️‍♀️Workout and get physically stronger</li>
                      <li>🧠👀👂Fill your mind with godly things: </li>
                      <ul className="pl-12 list-disc">
                        <li>🎵Music </li>
                        <li>📖Read the bible </li>
                        <li>📖Watch biblical sermons </li>
                        <li>💻📱Godly content in the internet </li>
                        <li>🗣Conversations about the Gospel of Jesus Christ </li>
                      </ul>
                      <li>🤔🧠💭Think on these thing </li>
                      <li>😃👋🙌Be a blessing to others</li>
                      <li>💯🎯Whatever work or activity, I must give 100% effort</li>
                      <li>⌛✍Do not waste time</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div> */}

            {/* <div className="flex flex-row gap-12 justify-center items-center">
              <AnimatedTestimonialsDemo />
              {
                reflectionQuestions ?
                  <div>
                    <h2 className="font-semibold text-center">Reflection Questions</h2>
                    <ul className="list-outside">
                      {getRandomQuestions(3, reflectionQuestions.reflectionQuestions ?? []).map((question, index) => {
                        return <li key={index} className="max-w-md text-wrap">{question}</li>
                      })}
                    </ul>
                  </div>
                  : null
              }
            </div> */}
          </div>
        </>
        :
        <p className="font-semibold text-2xl">{DateString(todayStart)} tasks were not added the database</p>
      }
    </>
  );
}
