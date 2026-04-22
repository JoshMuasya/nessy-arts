"use client"

import { motion } from "framer-motion"

interface ProcessStepProps {
    icon: React.ElementType
    step: string
    title: string
    desc: string
}

const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
}

const ProcessStep = ({ icon: Icon, step, title, desc }: ProcessStepProps) => {
    return (
        <motion.div
            variants={item}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-center p-6 rounded-2xl border border-white/5 hover:border-primary/30 bg-white/5 backdrop-blur transition"
        >
            {/* Step Number */}
            <div className="text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent opacity-30">
                {step}
            </div>

            {/* Icon */}
            <motion.div
                whileHover={{ rotate: 6, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
            >
                <Icon className="w-6 h-6 text-primary" />
            </motion.div>

            {/* Content */}
            <h3 className="font-display text-xl font-semibold mb-2">
                {title}
            </h3>

            <p className="text-muted-foreground text-sm">
                {desc}
            </p>
        </motion.div>
    )
}

export default ProcessStep