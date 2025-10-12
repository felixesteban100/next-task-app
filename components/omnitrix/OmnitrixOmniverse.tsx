"use client"

import { ALL_ALIENS_OMNIVERSE } from "@/constants/omnitrix"
import Image from "next/image"
import { useEffect, useState } from "react"

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

    if (transform) {
        return (
            <div className="space-y-5 flex flex-col items-center justify-center">
                <Image
                    src={aliensWithId[focus].img}
                    alt={aliensWithId[focus].name}
                    width={300}
                    height={300}
                    className={`${aliensWithId[focus].height?.character} `}
                    onClick={() => {
                        setOpen(false)
                        setTransform(false)
                    }}
                />
                <Ben10Logo size={50} setTransform={() => setFocus(() => Math.floor(Math.random() * aliensWithId.length))} />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center relative mt-30 ">
            <div className="">
                <Ben10Logo setTransform={() => setTransform(true)} />
            </div>
            <div onClick={() => setDisplaySelector(prev => !prev)} className={`absolute transition-all duration-500  ${open ? "translate-y-[-60%] -rotate-x-70" : ""}`}>
                <Ben10FrontPanel />
            </div>
            <div className={`absolute opacity-90 ${displaySelector ? "hidden" : ""}`} >
                <Ben10AlienSelectorCircle
                    transform={() => {
                        setOpen(true)
                        setDisplaySelector(true)
                    }}
                    focus={focus}
                    setFocus={setFocus}
                />
            </div>
        </div>
    )
}


function Ben10Logo({ setTransform, size = 180 }: { setTransform: () => void, size?: number }) {
    return (
        <div onClick={() => setTransform()} className={`flex flex-col items-center justify-center bg-black rounded-full relative`} style={{ width: `${size}px`, height: `${size}px` }}>
            <div
                className="absolute w-[80%] h-[80%] bg-lime-500"
                style={{
                    clipPath: "polygon(0% 0%, 100% 0%, 50% 60%)",
                    borderTopLeftRadius: "50% 50%",
                    borderTopRightRadius: "50% 50%",
                }}
            />
            <div
                className="absolute w-[80%] h-[80%] bg-lime-500"
                style={{
                    clipPath: "polygon(50% 30%, 0% 100%, 100% 100%)",
                    borderBottomLeftRadius: "50% 50%",
                    borderBottomRightRadius: "50% 50%",
                }}
            />
        </div>
    )
}

/* to edit */
function Ben10FrontPanel() {
    const size = 180
    return (
        <div className={`flex flex-row items-center justify-center bg-black rounded-sm relative`} style={{ width: `${size}px`, height: `${size}px` }}>
            <div
                className="absolute w-[100%] h-[100%] bg-lime-500"
                style={{
                    clipPath: "polygon(-10% 0%, 10% 0%, 40% 50%, 10% 100%, -10% 100%, 40% 50%)",
                }}
            />
            <div
                className="absolute w-[100%] h-[100%] bg-lime-500"
                style={{
                    clipPath: "polygon(110% 0%, 90% 0%, 60% 50%, 90% 100%, 110% 100%, 60% 50%)",
                }}
            />
        </div>
    )
}

function Ben10AlienSelectorCircle({ transform, focus, setFocus }: { transform: () => void, focus: number, setFocus: (index: number) => void }) {
    const size = 350
    const items = aliensWithId

    const surroundingItems = getSurroundingItems(items, focus, 2);

    function getSurroundingItems<T>(arr: T[], focusIndex: number, visibleCount: number = 2): T[] {
        const len = arr.length;
        const result: T[] = [];
        for (let i = -visibleCount; i <= visibleCount; i++) {
            const idx = (focusIndex + i + len) % len;
            result.push(arr[idx]);
        }
        return result;
    }

    return (
        <div className={`relative flex justify-center items-center transition-all`} style={{ width: `${size}px`, height: `${size}px` }}>
            <div className="w-full h-full bg-lime-800/90 [clip-path:circle(50%_at_50%_50%)] [mask:radial-gradient(circle,transparent_40%,black_41%)]" />
            {surroundingItems.map((item, idx) => {
                const position = idx - 2; // center is 0
                const translateY = -Math.abs(position) * -40;
                const scale = 1/*  - Math.abs(position) * 0.2 */;

                return (
                    <div
                        key={item.name}
                        onClick={() => setFocus(items.indexOf(item))}
                        className={` absolute w-[20%] h-[20%] ${focus === item.id ? "bg-green-800" : ""} flex items-center justify-center rounded-2xl cursor-pointer transition-all duration-300 -translate-y-35`}
                        style={{
                            transform: `translateX(${position * 70}px) translateY(${translateY}px) scale(${scale})`,
                            zIndex: 10 - Math.abs(position),
                        }}
                    >
                        <div
                            className="bg-lime-400 w-10 h-10"
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
                        ></div>
                    </div>
                );
            })}
        </div>
    )
}

