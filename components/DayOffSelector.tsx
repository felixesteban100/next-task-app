"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { saveDayOff } from "@/server/actions";

export default function DayOffSelector({ dayOff }: { dayOff: number }) {
    const [selectedDayOff, setSelectedDayOff] = useState(dayOff);
    const [loading, setLoading] = useState(false);
    const daysOfWeekWithId = [
        { id: -1, name: "None", fullName: "None" },
        { id: 1, name: "Mon", fullName: "Monday" },
        { id: 2, name: "Tue", fullName: "Tuesday" },
        { id: 3, name: "Wed", fullName: "Wednesday" },
        { id: 4, name: "Thu", fullName: "Thursday" },
        { id: 5, name: "Fri", fullName: "Friday" },
        { id: 6, name: "Sat", fullName: "Saturday" },
        { id: 0, name: "Sun", fullName: "Sunday" },
    ];

    function handleDayOffChange(dayId: number) {
        setSelectedDayOff(dayId);
    }

    async function onSubmit() {
        setLoading(true)
        document.body.classList.add('overflow-hidden');

        const fullName = daysOfWeekWithId.find(day => day.id === selectedDayOff)?.fullName || "None";

        const result = await saveDayOff(selectedDayOff, fullName)

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
                {daysOfWeekWithId.map((day) => (
                    <Button
                        key={day.id}
                        variant={selectedDayOff === day.id ? "default" : "outline"}
                        onClick={() => handleDayOffChange(day.id)}
                    >
                        {day.name}
                    </Button>
                ))}
            </div>
            <Button onClick={onSubmit} className="w-[100px]" disabled={selectedDayOff === dayOff || loading} >
                {loading ? "Loading..." : "Save"}
            </Button>
        </div>
    )
}