"use client"

import { ALL_ALIENS_OMNIVERSE } from "@/constants/omnitrix"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion";

const aliensWithId = ALL_ALIENS_OMNIVERSE.filter(c => c.video != "").map((alien, index) => ({ ...alien, id: index }))

const transformTimerDuration = 200000;

export default function OmnitrixOmniverse() {
    const [open, setOpen] = useState(false)
    const [displaySelector, setDisplaySelector] = useState(false)
    const [transform, setTransform] = useState(false)
    const [usePower, setUsePower] = useState(true)
    const [hasEnergy, setHasEnergy] = useState(true)

    const [focus, setFocus] = useState(() => Math.floor(Math.random() * aliensWithId.length));

    const [transformTimer, setTransformTimer] = useState<number>(transformTimerDuration)

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

    useEffect(() => {
        if (!transform) return;

        const start = Date.now();
        setTransformTimer(transformTimerDuration);

        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const remaining = Math.max(transformTimerDuration - elapsed, 0);

            setTransformTimer(remaining);

            if (remaining <= 0) {
                clearInterval(interval);
                changeColorForDischarge()
                setTimeout(() => {
                    setOpen(false)
                    setTransform(false)
                    setUsePower(true)
                    setHasEnergy(false)
                }, 4000)
            }
        }, 100); // update every 100ms for smoothness

        return () => clearInterval(interval);
    }, [transform]);

    function animateShakeElement(element: HTMLElement) {
        if (!element) return;
        element.animate(
            [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' },
            ],
            {
                duration: 300,
                iterations: 1,
            }
        );
    }

    function changeColorForDischarge() {
        const ben10LogoTopHalf = document.getElementById("ben-10-logo-top-half")!
        const ben10LogoBottomHalf = document.getElementById("ben-10-logo-bottom-half")!

        ben10LogoTopHalf.animate(
            [
                { backgroundColor: '#ff0000', opacity: 1, transform: 'scale(1)' },
                { backgroundColor: '#330000', opacity: 0.8, transform: 'scale(0.95)' },
                { backgroundColor: '#ff0000', opacity: 1, transform: 'scale(1)' }
            ],
            {
                duration: 1000,
                iterations: 6, // how many blinks
                easing: 'ease-in-out'
            }
        );

        ben10LogoBottomHalf.animate(
            [
                { backgroundColor: '#ff0000', opacity: 1, transform: 'scale(1)' },
                { backgroundColor: '#330000', opacity: 0.8, transform: 'scale(0.95)' },
                { backgroundColor: '#ff0000', opacity: 1, transform: 'scale(1)' }
            ],
            {
                duration: 1000,
                iterations: 6, // how many blinks
                easing: 'ease-in-out'
            }
        );
    }

    function SetUsePower() {
        setUsePower(false)
        setTimeout(() => {
            setUsePower(true)
        }, 10000)
    }

    if (transform) {
        return (
            <div className="space-y-5 flex flex-col items-center justify-center ">
                {
                    usePower ? (
                        <Image
                            src={aliensWithId[focus].img}
                            alt={aliensWithId[focus].name}
                            width={800}
                            height={800}
                            // className={`${aliensWithId[focus].height?.character} animate-zoom-in `}
                            className={`h-[400px] w-auto object-contain aspect-auto`}
                            // onClick={() => setUsePower(false)}
                            onClick={() => SetUsePower()}
                        />
                    ) : (
                        <Image
                            src={aliensWithId[focus].video}
                            alt={aliensWithId[focus].name}
                            width={800}
                            height={800}
                            // className={`${aliensWithId[focus].height?.character} animate-zoom-in `}
                            unoptimized
                            className={`h-[400px] w-auto object-contain aspect-auto`}
                        // onClick={() => setUsePower(true)}
                        />
                    )
                }

                <div className="flex gap-5 justify-center items-center">
                    <div id="ben-10-logo-transformed">
                        <Ben10Logo
                            size={50}
                            color={transform ? "bg-lime-400" : "bg-red-500"}
                            setChange={() => {
                                setFocus(() => Math.floor(Math.random() * aliensWithId.length))
                                setUsePower(true)
                            }}
                            setTransform={() => {
                                setOpen(false)
                                setUsePower(true)
                                setTransform(false)

                                // changeColorForDischarge()
                                // setTimeout(() => {
                                //     setTransform(false)
                                // }, 4000)
                            }}
                        />
                    </div>
                </div>
                <p>{(transformTimer / 1000).toFixed(1)}s</p>
            </div>
        )
    }

    return (
        <div className="space-y-16 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center relative mt-30">
                <div className={`${open ? "animate-[] [animation-iteration-count:1] " : ""}`}>
                    <Ben10Logo size={120} setTransform={() => {
                        setTransform(true)
                        setOpen(false)
                        setDisplaySelector(false)

                    }} />
                </div>
                <div
                    onClick={() => {
                        if (hasEnergy === true) {
                            setDisplaySelector(prev => !prev)
                            setOpen(false)
                        } else {
                            animateShakeElement(document.getElementById("omnitrix-front-panel")!)
                        }
                    }}
                    className={`absolute transition-all duration-500   ${open ? "translate-y-[-60%] -rotate-x-70" : ""}`}
                    id="omnitrix-front-panel"
                >
                    <Ben10FrontPanel hasEnergy={hasEnergy} size={displaySelector === true || open === true ? 150 : 200} />
                </div>
                <div className={`absolute opacity-90 ${displaySelector === false ? "hidden" : "flex "} animate-zoom-in justify-center items-center flex-col`} >
                    <Ben10AlienSelectorCircle
                        transform={() => {
                            setOpen(true)
                            setDisplaySelector(false)
                        }}
                        focus={focus}
                        setFocus={setFocus}
                    />

                    <div
                        onClick={() => setDisplaySelector(prev => !prev)}
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
            <div className="flex flex-col space-y-5 justify-center items-center">
                <p className="text-xl">Currently, the omnitrix has <span className={`${hasEnergy ? "text-lime-400" : "text-red-500"} font-bold`}>{aliensWithId.length}</span>/{ALL_ALIENS_OMNIVERSE.length} Aliens unlocked</p>
                <Ben10Logo color={hasEnergy ? "bg-lime-400" : "bg-red-500"} size={50} setTransform={() => {
                    setHasEnergy(prev => !prev)
                    setOpen(false)
                    setDisplaySelector(false)
                }} />
            </div>
        </div>
    )
}


function Ben10Logo({ setTransform, setChange = () => { }, size = 180, color = "bg-lime-500", animate = false }: { setTransform: () => void, setChange?: () => void, size?: number, color?: string, animate?: boolean }) {
    return (
        <div className="relative flex items-center justify-center cursor-pointer">
            <div onClick={() => setChange()} className="bg-gray-300 rounded-full relative" style={{ width: `${size + 15}px`, height: `${size + 15}px` }} />
            <div className="absolute" onClick={() => setTransform()}>
                <div className={`flex flex-col items-center justify-center bg-black rounded-full`} style={{ width: `${size}px`, height: `${size}px` }}>
                    <div
                        id="ben-10-logo-top-half"
                        className={`absolute w-[80%] h-[80%] ${color} ${animate ? "animate-[colorFade_2s_ease-in-out_infinite]" : ""}`}
                        style={{
                            clipPath: "polygon(0% 0%, 100% 0%, 50% 60%)",
                            borderTopLeftRadius: "50% 50%",
                            borderTopRightRadius: "50% 50%",
                        }}
                    />
                    <div
                        id="ben-10-logo-bottom-half"
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

function Ben10FrontPanel({ size = 200, hasEnergy }: { size?: number, hasEnergy: boolean }) {
    const color = hasEnergy ? "bg-lime-500" : "bg-red-700"

    return (
        <div className={`flex bg-black border-1 border-gray-800 rounded-sm  transition-all duration-700 overflow-hidden`} style={{ width: `${size}px`, height: `${size}px` }}>
            {/* <div className="animate-spin absolute w-full h-full overflow-hidden"> */}
            <div
                className={`absolute w-[79%] h-[99%] ${color}`}
                style={{
                    clipPath: "polygon(-10% 0%, 10% 0%, 50% 50%, 10% 100%, -10% 100%, 40% 50%)",
                }}
            />
            <div
                className={`absolute w-[79%] h-[99%] ${color}`}
                style={{
                    clipPath: "polygon(-10% 0%, 10% 0%, 50% 50%, 10% 100%, -10% 100%, 40% 50%)",
                    rotate: "180deg",
                    translate: "25% 0",
                }}
            />
            {/* </div> */}
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

