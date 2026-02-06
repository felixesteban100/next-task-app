"use client"

import React from 'react'
import { AnimatePresence, motion } from "framer-motion";

export default function AnimateWrapper({ keyItem, children }: { keyItem: string, children: React.ReactNode }) {
    return (
        <AnimatePresence>
            <motion.div
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300
                }}
                layout
                key={keyItem}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
