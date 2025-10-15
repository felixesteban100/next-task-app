"use client"

import { ALL_ALIENS_OMNIVERSE } from "@/constants/omnitrix"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion";

const aliensWithId = ALL_ALIENS_OMNIVERSE.map((alien, index) => ({ ...alien, id: index }))

export default function OmnitrixOmniverse() {
    const [open, setOpen] = useState(false)
    const [displaySelector, setDisplaySelector] = useState(true)
    const [transform, setTransform] = useState(false)

    const [focus, setFocus] = useState(() => Math.floor(Math.random() * aliensWithId.length));

    useEffect(() => {
        document.documentElement?.requestFullscreen();
        return () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        };
    }, []);

    useEffect(() => {
        const ben10LogoTransformed = document.getElementById("ben-10-logo-transformed")
        if (ben10LogoTransformed) {
            ben10LogoTransformed.classList.add("animate-spin")
            const timeout = setTimeout(() => {
                ben10LogoTransformed.classList.remove("animate-spin")
            }, 1000)
            return () => clearTimeout(timeout)
        }
    }, [focus])

    if (transform) {
        return (
            <div className="space-y-5 flex flex-col items-center justify-center">
                <Image
                    src={aliensWithId[focus].img}
                    alt={aliensWithId[focus].name}
                    width={300}
                    height={300}
                    // className={`${aliensWithId[focus].height?.character} `}
                    className={`h-[300px] w-auto animate-zoom-in`}

                />
                <div className="flex gap-5 justify-center items-center">
                    <div id="ben-10-logo-transformed">
                        <Ben10Logo size={50} setTransform={() => setFocus(() => Math.floor(Math.random() * aliensWithId.length))} />
                    </div>
                    <div
                        onClick={() => {
                            setOpen(false)
                            setTransform(false)
                        }}
                    >
                        <Ben10Logo color="bg-red-500" size={50} setTransform={() => setFocus(() => Math.floor(Math.random() * aliensWithId.length))} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center relative mt-30">
            <div className={`${open ? "animate-spin [animation-iteration-count:1] " : ""}`}>
                <Ben10Logo setTransform={() => setTransform(true)} />
            </div>
            <div
                onClick={() => {
                    setDisplaySelector(prev => !prev)
                    setOpen(false)
                }}
                className={`absolute transition-all duration-500  ${open ? "translate-y-[-60%] -rotate-x-70" : ""}`}
            >
                <Ben10FrontPanel />
            </div>
            <div className={`absolute opacity-90 ${displaySelector ? "hidden" : "flex "} animate-zoom-in justify-center items-center flex-col`} >
                <Ben10AlienSelectorCircle
                    transform={() => {
                        setOpen(true)
                        setDisplaySelector(true)
                    }}
                    focus={focus}
                    setFocus={setFocus}
                />

                <div
                    onClick={() => setDisplaySelector(true)}
                    className="absolute inset-0 bg-green-500 rounded-full w-[350px] h-[350px] z-10"
                    style={{
                        WebkitMaskImage: "conic-gradient(black 0deg 180deg, transparent 90deg 360deg), radial-gradient(circle, transparent 39%, black 40%)",
                        WebkitMaskComposite: "source-in",
                        maskComposite: "intersect",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        WebkitMaskSize: "100% 100%",
                        rotate: "90deg",
                    }}
                />
            </div>
        </div>
    )
}


function Ben10Logo({ setTransform, size = 180, color = "bg-lime-500", animate = false }: { setTransform: () => void, size?: number, color?: string, animate?: boolean }) {
    return (
        <div onClick={() => setTransform()} className="relative flex items-center justify-center cursor-pointer">
            <div className="bg-gray-300 rounded-full relative" style={{ width: `${size + 15}px`, height: `${size + 15}px` }} />
            <div className="absolute ">
                <div className={`flex flex-col items-center justify-center bg-black rounded-full`} style={{ width: `${size}px`, height: `${size}px` }}>
                    <div
                        className={`absolute w-[80%] h-[80%] ${color} ${animate ? "animate-[colorFade_2s_ease-in-out_infinite]" : ""}`}
                        style={{
                            clipPath: "polygon(0% 0%, 100% 0%, 50% 60%)",
                            borderTopLeftRadius: "50% 50%",
                            borderTopRightRadius: "50% 50%",
                        }}
                    />
                    <div
                        className={`absolute w-[80%] h-[80%] ${color} ${animate ? "animate-[colorFade_2s_ease-in-out_infinite]" : ""}`}
                        style={{
                            clipPath: "polygon(50% 30%, 0% 100%, 100% 100%)",
                            borderBottomLeftRadius: "50% 50%",
                            borderBottomRightRadius: "50% 50%",
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

function Ben10FrontPanel() {
    const size = 200
    return (
        <div className={`flex bg-black rounded-sm relative`} style={{ width: `${size}px`, height: `${size}px` }}>
            <div
                className="absolute w-[80%] h-[100%] bg-lime-500"
                style={{
                    clipPath: "polygon(-10% 0%, 10% 0%, 50% 50%, 10% 100%, -10% 100%, 40% 50%)",
                }}
            />
            <div
                className="absolute w-[80%] h-[100%] bg-lime-500"
                style={{
                    clipPath: "polygon(-10% 0%, 10% 0%, 50% 50%, 10% 100%, -10% 100%, 40% 50%)",
                    rotate: "180deg",
                    translate: "25% 0",
                }}
            />
        </div>
    )
}

function Ben10AlienSelectorCircle({ transform, focus, setFocus }: { transform: () => void, focus: number, setFocus: React.Dispatch<React.SetStateAction<number>> }) {
    const size = 350
    const items = aliensWithId

    const surroundingItems = getSurroundingItems(items, focus, 3);

    function getSurroundingItems<T>(arr: T[], focusIndex: number, visibleCount: number = 2): T[] {
        const len = arr.length;
        const result: T[] = [];
        for (let i = -visibleCount; i <= visibleCount; i++) {
            const idx = (focusIndex + i + len) % len;
            result.push(arr[idx]);
        }
        return result;
    }

    // const prev = () => setFocus((prev: number) => (prev - 1 + items.length) % items.length);
    // const next = () => setFocus((prev: number) => (prev + 1) % items.length);

    return (
        <div className={`relative flex justify-center items-center transition-all  overflow-hidden`} style={{ width: `${size}px`, height: `${size}px` }}>
            <div className="w-full h-full bg-lime-400/90 [clip-path:circle(50%_at_50%_50%)] [mask:radial-gradient(circle,transparent_40%,black_41%)]" />
            <div className="absolute w-[40%] h-full flex items-center justify-center ">
                <AnimatePresence>
                    {surroundingItems.map((item, idx) => {
                        const position = idx - 3; // center is 0, goes from -3 to 3

                        // X distance between items
                        const xOffset = position * 70;

                        // Y curve: smoother and more "circular"
                        // try adjusting radius or multiplier to control curvature
                        const radius = 150; // the "curve tightness" — larger means flatter
                        const yOffset = -Math.sqrt(Math.max(0, radius ** 2 - (position * 70) ** 2)) + radius;

                        // scale and rotation
                        // const scale = 1 - Math.abs(position) * 0.15;
                        const rotateY = position * -25;

                        return (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    x: xOffset,
                                    y: yOffset,
                                    // scale,
                                    rotateY,
                                    opacity: 1,
                                    zIndex: 100 - Math.abs(position),
                                }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{
                                    type: "keyframes",
                                    duration: 0.2, // seconds
                                    ease: "easeInOut",
                                }}
                                className={`absolute w-24 h-24 ${/* focus === item.id ? "bg-lime-600" : "" */""} rounded-2xl flex items-center justify-center font-semibold cursor-pointer -translate-y-[130px]`}
                                onClick={() => setFocus(items.indexOf(item))}
                            >
                                <div
                                    // className="bg-lime-800 w-10 h-10"
                                    className={`${focus === item.id ? "bg-lime-400" : "bg-lime-800"} w-10 h-10`}
                                    onClick={() => {
                                        if (item.id === focus) {
                                            transform()
                                        }
                                    }}
                                    style={{
                                        WebkitMaskImage: `url(${item.img})`,
                                        WebkitMaskSize: "contain",
                                        WebkitMaskRepeat: "no-repeat",
                                        WebkitMaskPosition: "center",
                                        maskImage: `url(${item.img})`,
                                        maskSize: "contain",
                                        maskRepeat: "no-repeat",
                                        maskPosition: "center",
                                    }}
                                />
                            </motion.div>
                        );
                    })}
                    <div className="bg-green-700 h-[90px] w-[60px] -translate-y-[140px]" />
                </AnimatePresence>
            </div>
        </div>
    )
}

