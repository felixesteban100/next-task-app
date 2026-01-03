"use client"

import { getFormattedTime } from "@/lib/utils";
import { useState, useEffect } from "react";

const Clock = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const timestamp = Date.now();
            const formattedTime = getFormattedTime(timestamp);
            setTime(formattedTime);
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        document.documentElement?.requestFullscreen();
        return () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        };
    }, []);

    return <div className="text-[12rem] font-mono mt-32">{time}</div>;
};

export default Clock;