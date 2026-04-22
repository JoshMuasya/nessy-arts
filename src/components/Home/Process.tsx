"use client"

import { Camera, Pencil, Truck } from "lucide-react"
import { motion } from "framer-motion"
import SectionHeading from "./SectionHeading"
import ProcessStep from "./ProcessStep"

const steps = [
    {
        icon: Camera,
        step: "01",
        title: "Submit Your Photo",
        desc: "Upload a high-quality photo and share any special instructions.",
    },
    {
        icon: Pencil,
        step: "02",
        title: "Drawing Process",
        desc: "Our artist meticulously brings your portrait to life, stroke by stroke.",
    },
    {
        icon: Truck,
        step: "03",
        title: "Delivery",
        desc: "Your finished portrait is carefully packaged and delivered to your door.",
    },
]

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const Process = () => {
    return (
        <section className="py-24 bg-gradient-dark">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="How It Works"
                    subtitle="Three simple steps to your portrait"
                />

                <div className="relative">
                    {/* Connecting line */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-primary/20 -z-10" />

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {steps.map((step) => (
                            <ProcessStep key={step.step} {...step} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Process