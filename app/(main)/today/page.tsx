import { AnimatedTestimonialsDemo } from "@/components/animated-testimonials";
import Tasks from "@/components/TaskToEdit";
import { collectionReflectionQuestions, collectionTask } from "@/db/mongodb/mongodb";
import { getTodaysDate } from "@/lib/utils";
import { ObjectId } from "mongodb";
import { connection } from "next/server";

import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog"
// import KneeFlexionRoutine from "@/components/KneeFlexionRoutine";



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
          <Dialog>
            <Tasks dayInfo={JSON.parse(JSON.stringify(ToDayInfo))} hourAdded={formattedTime} />
            <DialogContent>
              <DialogTitle>🦵 Knee improvement Routine</DialogTitle>
              <div className="space-y-5 overflow-y-scroll h-96">
                <section >
                  <h2 className="text-xl font-semibold mb-2">✅ 1. Warm-Up (Pick One – 5–10 min)</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>🚲 Stationary Bike – 5–8 min, low resistance</li>
                    <li>🔥 Heat Pack – 10 min on front of the knee</li>
                  </ul>
                </section>

                <section >
                  <h2 className="text-xl font-semibold mb-2">✅ 2. Patella (Kneecap) Mobilization (2–3 min)</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Sit or lie down with the quad relaxed</li>
                    <li>Use fingers to gently move the kneecap:</li>
                    <ul className="list-inside list-disc ml-6">
                      <li>⬆️ Up and ⬇️ Down</li>
                      <li>⬅️ Left and ➡️ Right</li>
                    </ul>
                    <li>Hold each direction for 5–10 sec</li>
                    <li>Do for 1–2 min total</li>
                    <li><em>Tip: Do this before stretching to improve knee bending!</em></li>
                  </ul>
                </section>

                <section >
                  <h2 className="text-xl font-semibold mb-2">✅ 3. Flexion Exercises (10–15 min)</h2>
                  <h3 className="font-semibold mt-2">🔁 Heel Slides (Rocking)</h3>
                  <ul className="list-disc list-inside ml-4 mb-4">
                    <li>Lie down, foot on towel/sliders</li>
                    <li>Slide heel toward glutes until discomfort</li>
                    <li>Hold for 30 sec, rock gently</li>
                    <li>10 reps × 2–3 sets</li>
                  </ul>
                  <h3 className="font-semibold mt-2">🪑 Seated Wall Scoots</h3>
                  <ul className="list-disc list-inside ml-4 mb-4">
                    <li>Sit on floor, back against wall</li>
                    <li>Slide butt toward heel until deep stretch</li>
                    <li>Hold 30–60 sec</li>
                    <li>Repeat 2–3 times</li>
                  </ul>
                  <h3 className="font-semibold mt-2">🦵 Quad Stretch (Heel to Butt)</h3>
                  <ul className="list-disc list-inside ml-4 mb-4">
                    <li>Stand or lie on stomach</li>
                    <li>Pull heel to butt using hand or strap</li>
                    <li>Keep hips neutral</li>
                    <li>30 sec × 3 reps</li>
                  </ul>
                </section>

                <section >
                  <h2 className="text-xl font-semibold mb-2">✅ 4. Optional Bonus Work</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Foam Roll quads, hamstrings, IT band – 1–2 min each</li>
                    <li>Deep squat holds (if safe) – 10–20 sec × 2 reps</li>
                    <li>Quad activation (e.g., TKEs, leg raises) – 2 sets of 10</li>
                  </ul>
                </section>

                <section >
                  <h2 className="text-xl font-semibold mb-2">✅ 5. Post-Session Swelling Management</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>🧊 Ice the knee for 15–20 min (use a towel barrier)</li>
                    <li>🦵 Elevate leg above heart level for 15–20 min</li>
                    <li>🧦 Wear compression sleeve (optional but helpful)</li>
                    <li>🚶‍♂️ Walk lightly (10–20 steps/hour) if tolerated</li>
                  </ul>
                </section>

                <section >
                  <h2 className="text-xl font-semibold mb-2">✅ 💡 Progress Notes</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Mild discomfort = ✅ OK (1–3/10 pain)</li>
                    <li>Sharp or lingering pain = ❌ Stop/scale back</li>
                    <li>Reassess flexion every 2–3 days</li>
                  </ul>
                </section>
              </div>
            </DialogContent>
          </Dialog>

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
