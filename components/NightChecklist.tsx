"use client"

import { useState } from "react";
import { Button } from "./ui/button";
import { NIGHT_BIBLE_PASSAGES } from "@/constants";


export default function NightChecklist({ resources }: { resources: { name: string; url: string }[] }) {
    const [workingOrNotTommorrowMorning, setWorkOrNotTommorrowMorning] = useState<boolean | null>(null);

    const randomSelectedBiblePassage = NIGHT_BIBLE_PASSAGES[Math.floor(Math.random() * NIGHT_BIBLE_PASSAGES.length)];

    const notWorkingTomorrowMorning = (
        <li className="space-y-2" onClick={() => setWorkOrNotTommorrowMorning(null)}>
            <div className="flex gap-3">
                <span className="">▢</span>
                <span>Watch something not fast pased </span>
            </div>
            <ul className="ml-8">
                {resources.map((resource) => (
                    <li key={resource.name} className="list-disc list-inside">
                        <a href={resource.url} target="_blank" className="hover:underline hover:text-indigo-600">{resource.name}</a>
                    </li>
                ))}
            </ul>
        </li>
    )

    const workingTomorrowMorning = (
        <li className="space-y-2" onClick={() => setWorkOrNotTommorrowMorning(null)}>
            <div className="flex gap-3">
                <span className="">▢</span>
                <span>Go upstairs and Read phisical bible in <span className="text-indigo-600">{randomSelectedBiblePassage}</span></span>
            </div>
        </li>
    )

    return (
        <div className="mt-6 w-[80%] rounded-2xl border border-foreground-800  p-6 shadow-foreground/10 shadow-xl flex flex-col gap-6 justify-center items-center">
            <header>
                <h2 className="text-lg font-bold tracking-wide">
                    TRUST GOD FOR THE TOMMORROW
                </h2>
            </header>

            <ul className="space-y-4 text-sm leading-relaxed">
                <li className="flex gap-3">
                    <span className="">▢</span>
                    <span>Teeth brushed</span>
                </li>

                <div>
                    {workingOrNotTommorrowMorning === true ?
                        workingTomorrowMorning
                        : workingOrNotTommorrowMorning === false ? notWorkingTomorrowMorning :
                            (
                                <div className="flex flex-col">
                                    <p className="mb-2">Will you be working tomorrow morning?</p>
                                    <div className="flex w-full gap-4 justify-center">
                                        <Button onClick={() => setWorkOrNotTommorrowMorning(true)}>Yes</Button>
                                        <Button onClick={() => setWorkOrNotTommorrowMorning(false)}>No</Button>
                                    </div>
                                </div>
                            )
                    }
                </div>

                <li className="flex gap-3">
                    <span className="">▢</span>
                    <span>
                        (When feeling sleepy) Go to bedroom <span className="font-semibold ">without Phone</span>
                    </span>
                </li>
            </ul>

            <p className="mt-5 text-xs text-neutral-500 text-center">
                No devices. No negotiation. Just honesty.
            </p>
        </div>
    );
}
