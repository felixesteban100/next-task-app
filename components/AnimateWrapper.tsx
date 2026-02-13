"use client"

import React from 'react'
import { AnimatePresence, motion } from "framer-motion";

export default function AnimateWrapper({ keyItem, children, classNames }: { keyItem: string, children: React.ReactNode, classNames?: string }) {
    return (
        <AnimatePresence>
            <motion.div
                transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300
                }}
                className={classNames}
                layout
                key={keyItem}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
