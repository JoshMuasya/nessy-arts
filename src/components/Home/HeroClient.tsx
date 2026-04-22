"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useMemo } from "react"

const TextType = dynamic(() => import("../Animated/TextType"), {
    ssr: false,
});

const HeroClient = () => {
    const texts = useMemo(() => ["Timeless Art", "Luxury Portraits"], []);

    return (
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight mb-6 text-center"
            >
                Turning Memories into{" "}
                <TextType
                    text={texts}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor
                    cursorCharacter="|"
                    deletingSpeed={50}
                    variableSpeed={{ min: 60, max: 120 }}
                    cursorBlinkDuration={0.5}
                    className="bg-gradient-to-r from-[oklch(0.82_0.12_85)] via-[oklch(0.72_0.16_75)] to-[oklch(0.58_0.18_70)] bg-clip-text text-transparent"
                />
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto"
            >
                Handcrafted pencil and charcoal portraits that capture the emotion and beauty of your most cherished moments.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <Link
                    href="/order"
                    prefetch
                    className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                    Order a Portrait
                </Link>
                <Link
                    href="/gallery"
                    className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary/10 transition-colors"
                >
                    View Gallery
                </Link>
            </motion.div>
        </div>
    )
}

export default HeroClient