"use client"

import { useState, useEffect } from "react";

const Clock = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const timestamp = Date.now();
            const formattedTime = new Intl.DateTimeFormat("en-US", {
                timeZone: "America/New_York",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            }).format(timestamp);
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