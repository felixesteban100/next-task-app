"use client";
import { cn } from "@/lib/utils";
import { CheckCircle2Icon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";

type LoadingState = {
    text: string;
};

const LoaderCore = ({
    loadingStates,
    value = 0,
}: {
    loadingStates: LoadingState[];
    value?: number;
}) => {
    return (
        <div className="flex relative justify-start max-w-xl mx-auto flex-col mt-40">
            {loadingStates.map((loadingState, index) => {
                const distance = Math.abs(index - value);
                const opacity = Math.max(1 - distance * 0.2, 0); // Minimum opacity is 0, keep it 0.2 if you're sane.

                return (
                    <motion.div
                        key={index}
                        className={cn("text-left flex gap-2 mb-4")}
                        initial={{ opacity: 0, y: -(value * 40) }}
                        animate={{ opacity: opacity, y: -(value * 40) }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            {index > value && (
                                <CheckCircle2Icon />
                            )}
                            {index <= value && (
                                <CheckCircle2Icon
                                    className="fill-primary stroke-primary-foreground"
                                />
                            )}
                        </div>
                        <span
                            className={`${value === index && "text-primary opacity-100 font-semibold"}`}
                        >
                            {loadingState.text}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    );
};

export const MultiStepLoader = ({
    loadingStates,
    loading,
    duration = 2000,
    loop,
}: {
    loadingStates: LoadingState[];
    loading?: boolean;
    duration?: number;
    loop: boolean;
    callbackAfterLoading: () => void;
}) => {
    const [currentState, setCurrentState] = useState(0);

    useEffect(() => {
        if (!loading) {
            setCurrentState(0);
            return;
        }
        const timeout = setTimeout(() => {
            setCurrentState((prevState) =>
                loop === true
                    ? prevState === loadingStates.length - 1
                        ? 0
                        : prevState + 1
                    : Math.min(prevState + 1, loadingStates.length - 1)
            );
        }, duration);

        return () => clearTimeout(timeout);
    }, [currentState, loading, loop, loadingStates.length, duration]);

    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl overflow-hidden"
                >
                    <div className="h-96  relative">
                        <LoaderCore value={currentState} loadingStates={loadingStates} />
                    </div>

                    <div className="bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-background h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
