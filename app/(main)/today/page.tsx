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

  const reflectionQuestions = [
    "⏳ What will happen now if you sin?",
    "📆 What will happen tomorrow if you sin?",
    "🗓️ What will happen in 5 months if you sin?",
    "⏳ What will happen in 10 years if you sin?",
    "⚖️ Is this momentary pleasure worth the regret I’ll feel afterward?",
    "🤔 Would I be okay if everyone I respect knew I was doing this?",
    "🌅 How will I feel about this decision tomorrow morning?",
    "💪 Am I strengthening my self-control or weakening it?",
    "🔮 What would my future self want me to do right now?",
    "🛤️ Am I acting like the person I want to become?",
    "🙏 Will this bring me closer to God or push me further from Him?",
    "🛑 If I give in tonight, will it be easier or harder to resist next time?",
    "🧐 What’s the real reason I’m feeling this temptation right now? (Tired? Lonely? Bored?)",
    "🏆 Will I be proud of this decision when I look back on it?",
    "⏭️ If I don’t stop this habit now, what kind of person will I be in 5 years?",
    "🚀 If I break this cycle, how much stronger will I be in 6 months?",
    "🔍 What else could I do right now that would make me feel fulfilled?",
    "🎯 What is my ultimate goal in life, and does this action help me reach it?",
    "🛡️ If I resist now, how much easier will it be to resist next time?",
    "⚠️ Is this really what I want, or just a short-term escape?",
    "❤️ What am I really craving—pleasure, connection, or peace?",
    "💤 How will this affect my sleep, energy, and mindset tomorrow?",
    "🔄 What’s one small action I can take right now to shift my focus (praying, stretching, reading)?",
    "🤝 What would I say to a close friend struggling with this?",
    "😁 Who will smile if I sin: God or Devil?"
  ];

  const getRandomQuestions = (count: number): string[] => {
    const shuffled = [...reflectionQuestions].sort(() => Math.random() - 0.5);
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
              <ul className="list-disc">
                <li>Open clock app</li>
                <li>Turn off TV</li>
                <li>Wrap yourself up in the blanket</li>
                <li>Thank God for this day, and for forgiveness of today&apos;s sins</li>
              </ul>
            </div>

            {/* <div>
              <p>Because you have seen the same cicle🔁❌:</p>
              <p>You feel tempted, you don&apos;t think in God (even forget God), you sin, you feel guilty, and forget that you sin</p>
              <p>Instead you must🙌✅:</p>
              <p>Scape that temptation knowing is not worth it, pray to God, do what you have to do (responsabilities)</p>
            </div> */}

            <div>
              <h2 className="font-semibold text-center">Reflection Questions</h2>
              <ul className="list-disc">
                {getRandomQuestions(5).map((question, index) => {
                  // return <li key={index} dangerouslySetInnerHTML={{ __html: question.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                  return <li key={index}>{question}</li>
                })}
              </ul>
            </div>
          </div>
        </>
        :
        <p className="font-semibold text-2xl">{today} tasks were not added the database</p>
      }

    </>
  );
}
