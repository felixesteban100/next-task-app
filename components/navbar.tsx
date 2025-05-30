"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Accessibility, Calendar, Clock, History, LetterText, Loader, PlusIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import Lottie from 'lottie-react'; // Import lottie-react for better integration
// import { EMOJIS_CODE } from "@/constants"

import Shine from "@/public/emoji/Shine.json"
import HandsPray from "@/public/emoji/HandsPray.json"
// import Brain from "@/public/emoji/Brain.json"
// import Palms from "@/public/emoji/Palms.json"
// import Heart from "@/public/emoji/Heart.json"
import Praise from "@/public/emoji/Praise.json"
// import CloudThinking from "@/public/emoji/CloudThinking.json"
import Lightning from "@/public/emoji/Lightning.json"
// import Think from "@/public/emoji/Think.json"
import Fire from "@/public/emoji/Fire.json"
import StarShine from "@/public/emoji/StarShine.json"
// import Cross from "@/public/emoji/Cross.json"
import Lightbulb from "@/public/emoji/Lightbulb.json"
import HeartShine from "@/public/emoji/HeartShine.json"
// import Dove from "@/public/emoji/Dove.json"


import Bible from "@/public/emoji/Bible.json"
import ThinkingMechanics from "@/public/emoji/ThinkingMechanics.json"
import RunningMan from "@/public/emoji/RunningMan.json"
import HeartFilled from "@/public/emoji/HeartFilled.json"

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import KneeFlexionRoutine from "@/components/KneeFlexionRoutine";


const links = [
    {
        href: "/today",
        label: "Today",
        icon: <Calendar />
    },
    {
        href: "/previous-days",
        label: "Previous days",
        icon: <History />
    },
    {
        href: "/api/today",
        label: "Add today to the database",
        icon: <PlusIcon />
    },
    {
        href: "/clock",
        label: "Clock App",
        icon: <Clock />
    },
    {
        href: "/knee",
        label: "Knee Improvement Routine",
        icon: <Accessibility />
    },
    {
        href: "/speak-english",
        label: "Speak English",
        icon: <LetterText />
    },
]

const titles = [
    "Glorify God in All Things", // ✨🙏
    "Glorify God in Mind, Deed, and Heart", // 🧠🤲❤️
    "Honor God in Thought, Action, Intention", // 🙌💭⚡
    "Think, Act, Intend for God's Glory", // 🤔🔥🌟
    "Glorify God in All You Do", // ✝️💡💖
    "Every Thought & Action for God", // 🕊️💭👐
]

const emojis = [
    [HandsPray, Shine],
    [ThinkingMechanics, RunningMan, HeartFilled /* Brain, */ /* Palms, *//*  Heart */],
    [Praise, /* CloudThinking, */ Lightning],
    [/* Think, */ Fire, StarShine],
    [Bible,/* Cross,  */Lightbulb, HeartShine],
    [ThinkingMechanics, RunningMan/* Dove, */ /* CloudThinking, *//* Palms */],
]

/* const link = [
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/2728/lottie.json",
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/1f64f/lottie.json",
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/undefined/lottie.json",
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/undefined/lottie.json",
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/undefined/lottie.json",
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/1f64c/lottie.json",
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/undefined/lottie.json", // CloudThinking
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/26a1/lottie.json",
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/1f914/lottie.json",
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/lottie.json",
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/1f31f/lottie.json", // StarShine
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/undefined/lottie.json", // Cross
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/1f4a1/lottie.json",
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/1f496/lottie.json",
    // "https://fonts.gstatic.com/s/e/notoemoji/latest/undefined/lottie.json", // Dove
] */

// function getLink(emojiCode: string) {
//     return `https://fonts.gstatic.com/s/e/notoemoji/latest/${emojiCode}/lottie.json`
// }

// function getCode(emoji: string): string {
//     return Object.entries(EMOJIS_CODE).filter(([, { value }]) => value === emoji).map(c => c[1].key)[0]
// }

// console.log(emojis.map(emoji => getLink(getCode(emoji))))


export default function Navbar() {
    const pathname = usePathname()
    const { isLoaded, isSignedIn } = useAuth()

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % titles.length);
        }, 5000); // Change text every 2 seconds
        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);

    // if (pathname === "/clock") return (
    //     <div className="w-full flex justify-end">
    //         <Button size={"icon"} className="h-10" variant="ghost" asChild>
    //             <Link href="/today"><X className="size-10" /></Link>
    //         </Button>
    //     </div>
    // )

    return (
        <nav className='h-fit bg-secondary flex flex-row justify-between py-2 px-10 fixed top-0 w-screen z-50'>
            <Link href={`/`} className="text-2xl font-bold text-center  transition-opacity duration-300 relative w-full">
                <AnimatePresence>
                    <motion.h1
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ ease: "easeInOut" }}
                        style={{ position: "absolute" }}
                        className="flex items-center gap-2"
                    >
                        {titles[index]}
                        {emojis[index].map((emoji, i) => {
                            return (
                                <Lottie
                                    key={i}
                                    animationData={emoji}  // Pass in the JSON animation file
                                    loop // Loop the animation
                                    autoplay // Play animation when component mounts
                                    style={{ width: 35, height: 35 }}
                                />
                            )
                        })}
                    </motion.h1>
                </AnimatePresence>
            </Link>
            <div className="flex gap-2 items-center">
                {!isLoaded && <Loader className="animate-spin" />}



                {isLoaded && isSignedIn && (
                    <>
                        <UserButton appearance={{ elements: { userButtonAvatarBox: { height: "30px", width: "30px" } } }} />
                        {links.map(link => {
                            if (link.label === "Knee Improvement Routine") return (
                                <Dialog key={link.href}>
                                    <DialogTrigger>
                                        <TooltipProvider key={link.href}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant={"outline"} size={"icon"} className={`${pathname === link.href ? "bg-primary text-primary-foreground" : ""} rounded-full`} asChild>
                                                        <div>{link.icon}</div>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{link.label}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                    </DialogTrigger>
                                    <DialogContent className="h-[85vh] overflow-y-scroll">
                                        <DialogTitle>🦵 Knee improvement Routine</DialogTitle>
                                        <KneeFlexionRoutine />
                                    </DialogContent>
                                </Dialog>
                            )


                            return (
                                <TooltipProvider key={link.href}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant={"outline"} size={"icon"} className={`${pathname === link.href ? "bg-primary text-primary-foreground" : ""} rounded-full`} asChild>
                                                <Link href={link.href}>
                                                    {link.icon}
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{link.label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )
                        })}
                    </>
                )}

                {isLoaded && !isSignedIn && (
                    <Button asChild>
                        <SignInButton />
                    </Button>
                )}
                <ModeToggle />
            </div>
        </nav>
    )
}



{/* <div className="space-y-5 overflow-y-scroll h-96">
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

                            <section>
                                <h2 className="text-xl font-semibold mb-2">✅ 💡 Progress Notes</h2>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Mild discomfort = ✅ OK (1–3/10 pain)</li>
                                    <li>Sharp or lingering pain = ❌ Stop/scale back</li>
                                    <li>Reassess flexion every 2–3 days</li>
                                </ul>
                            </section>
                        </div> */}