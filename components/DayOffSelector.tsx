"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { saveDayOff } from "@/server/actions";

export type DayOff = {
    id: number;
    name: string;
    fullName: string;
    selected: boolean;
}

export default function DayOffSelector({ daysOff }: { daysOff: DayOff[] }) {
    const [daysOffState, setDaysOffState] = useState(daysOff);
    const [loading, setLoading] = useState(false);

    function handleDayOffChange(dayId: number) {
        setDaysOffState(prev => prev.map(day => (day.id === dayId ? { ...day, selected: !day.selected } : day)));
    }

    async function onSubmit() {
        setLoading(true)
        document.body.classList.add('overflow-hidden');

        console.log(daysOffState)
        const result = await saveDayOff(daysOffState)

        setTimeout(() => {
            setLoading(false)
            document.body.classList.remove('overflow-hidden');

            if (result === true) {
                toast.success("Dayoff have been saved.")
            } else {
                toast.error("Dayoff didn't save.")
            }
        }, 1000);
    }

    return (
        <div className="flex flex-col gap-3 justify-center items-center">
            <div className="flex gap-3">
                {daysOffState.map((day) => (
                    <Button
                        key={day.id}
                        variant={day.selected ? "default" : "outline"}
                        onClick={() => handleDayOffChange(day.id)}
                    >
                        {day.name}
                    </Button>
                ))}
            </div>
            <Button onClick={onSubmit} className="w-[100px]" disabled={daysOffState === daysOff || loading} >
                {loading ? "Loading..." : "Save"}
            </Button>
        </div>
    )
}