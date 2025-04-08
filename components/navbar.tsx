"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Accessibility, Calendar, Clock, History, Loader, PlusIcon } from "lucide-react"
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
