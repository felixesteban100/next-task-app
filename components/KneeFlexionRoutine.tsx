import React from "react";

type SectionProps = {
    title: string;
    children: React.ReactNode;
};

type ListProps = {
    items: (string | React.ReactNode)[];
};

type ExerciseProps = {
    title: string;
    steps: string[];
};

const KneeFlexionRoutine: React.FC = () => {
    return (
        <div className="">
            <div className="max-w-3xl mx-auto  shadow-xl rounded-2xl p-8">
                <h1 className="text-2xl font-bold mb-4">🦵 Knee Flexion Routine: Post-ACL/Meniscus </h1>
                <p className="mb-6 text-sm ">
                    <strong>Goal:</strong> Improve flexion beyond 130°<br />
                    <strong>Frequency:</strong> 2–3x/day (Morning, Midday, Evening)<br />
                    <strong>Time:</strong> ~15–20 min/session
                </p>

                <Section title="1. Warm-Up (Pick One – 5–10 min)">
                    <List items={[
                        "🚲 Stationary Bike – 5–8 min, low resistance",
                        "🔥 Heat Pack – 10 min on front of the knee"
                    ]} />
                </Section>

                <Section title="2. Patella (Kneecap) Mobilization (2–3 min)">
                    <List items={[
                        "Sit or lie down with the quad relaxed",
                        "Use fingers to gently move the kneecap:",
                        <ul key="" className="list-inside list-disc ml-6">
                            <li>⬆️ Up and ⬇️ Down</li>
                            <li>⬅️ Left and ➡️ Right</li>
                        </ul>,
                        "Hold each direction for 5–10 sec",
                        "Do for 1–2 min total",
                        <em key="">Tip: Do this before stretching to improve knee bending!</em>
                    ]} />
                </Section>

                <Section title="3. Flexion Exercises (10–15 min)">
                    <Exercise
                        title="🔁 Heel Slides (Rocking)"
                        steps={[
                            "Lie down, foot on towel/sliders",
                            "Slide heel toward glutes until discomfort",
                            "Hold for 30 sec, rock gently",
                            "10 reps × 2–3 sets"
                        ]}
                    />

                    <Exercise
                        title="🪑 Seated Wall Scoots"
                        steps={[
                            "Sit on floor, back against wall",
                            "Slide butt toward heel until deep stretch",
                            "Hold 30–60 sec",
                            "Repeat 2–3 times"
                        ]}
                    />

                    <Exercise
                        title="🦵 Quad Stretch (Heel to Butt)"
                        steps={[
                            "Stand or lie on stomach",
                            "Pull heel to butt using hand or strap",
                            "Keep hips neutral",
                            "30 sec × 3 reps"
                        ]}
                    />
                </Section>

                <Section title="4. Bonus Work">
                    <List items={[
                        "Foam Roll quads, hamstrings, IT band – 1–2 min each",
                        "Deep squat holds (if safe) – 10–20 sec × 2 reps",
                        "Quad activation (e.g., TKEs, leg raises) – 2 sets of 10"
                    ]} />
                </Section>

                <Section title="5. Post-Session Swelling Management">
                    <List items={[
                        "🧊 Ice the knee for 15–20 min (use a towel barrier)",
                        "🦵 Elevate leg above heart level for 15–20 min",
                        "🧦 Wear compression sleeve (optional but helpful)",
                        "🚶‍♂️ Walk lightly (10–20 steps/hour) if tolerated"
                    ]} />
                </Section>

                <Section title="💡 Progress Notes">
                    <List items={[
                        "Mild discomfort = ✅ OK (1–3/10 pain)",
                        "Sharp or lingering pain = ❌ Stop/scale back",
                        "Reassess flexion every 2–3 days"
                    ]} />
                </Section>
            </div>
        </div>
    );
};

const Section: React.FC<SectionProps> = ({ title, children }) => (
    <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">✅ {title}</h2>
        {children}
    </section>
);

const List: React.FC<ListProps> = ({ items }) => (
    <ul className="list-disc list-inside space-y-1">
        {items.map((item, idx) => (
            <li key={idx}>{item}</li>
        ))}
    </ul>
);

const Exercise: React.FC<ExerciseProps> = ({ title, steps }) => (
    <div className="mb-4">
        <h3 className="font-semibold mt-2">{title}</h3>
        <ul className="list-disc list-inside ml-4">
            {steps.map((step, idx) => (
                <li key={idx}>{step}</li>
            ))}
        </ul>
    </div>
);

export default KneeFlexionRoutine;
