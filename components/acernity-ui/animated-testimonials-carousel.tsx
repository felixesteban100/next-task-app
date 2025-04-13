"use client";

// import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Testimonial = {
    focusTheme: string;
    bibleVerse: string;
    quote: string;
    src: string;
};
export const AnimatedTestimonialsCarousel = ({
    testimonials,
    autoplay = false,
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);

    const handleNext = useCallback(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const handlePrev = useCallback(() => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    const isActive = (index: number) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay, handleNext]);

    const randomRotateY = () => {
        return Math.floor(Math.random() * 21) - 10;
    };
    return (
        <div className=" font-sans antialiased ">
            <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2 mb-10">
                <div className="h-40 w-16">
                    <AnimatePresence>
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.src + index + testimonial.focusTheme}
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                    z: -100,
                                    rotate: randomRotateY(),
                                }}
                                animate={{
                                    opacity: isActive(index) ? 1 : 0.7,
                                    scale: isActive(index) ? 1 : 0.95,
                                    z: isActive(index) ? 0 : -100,
                                    rotate: isActive(index) ? 0 : randomRotateY(),
                                    zIndex: isActive(index)
                                        ? 40
                                        : testimonials.length + 2 - index,
                                    y: isActive(index) ? [0, -80, 0] : 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.9,
                                    z: 100,
                                    rotate: randomRotateY(),
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                    // delay: 0.5
                                }}
                                className="absolute inset-0 origin-bottom"
                            >
                                <Image
                                    src={testimonial.src}
                                    alt={testimonial.focusTheme}
                                    width={500}
                                    height={500}
                                    draggable={false}
                                    className="size-full rounded-3xl object-cover object-center"
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            <div className="w-full flex justify-between items-center">
                <Button variant={"ghost"} onClick={() => handlePrev()}><ArrowLeft /></Button>
                <Button variant={"ghost"} onClick={() => handleNext()}><ArrowRight /></Button>
            </div>
        </div>
    );
};
