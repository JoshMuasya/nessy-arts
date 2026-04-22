"use client"

import { Gift, Heart, Paintbrush } from "lucide-react"
import SectionHeading from "./SectionHeading"
import FeatureCard from "./FeatureCard"

const features = [
    {
        id: 1,
        icon: Paintbrush,
        title: "Handcrafted Detail",
        desc: "Every stroke is placed with precision and care, capturing the finest details of your photo.",
    },
    {
        id: 2,
        icon: Heart,
        title: "Emotion Capture",
        desc: "We don't just draw faces — we capture the soul, the story, and the emotion behind every portrait.",
    },
    {
        id: 3,
        icon: Gift,
        title: "Perfect Gift",
        desc: "A timeless, one-of-a-kind present for birthdays, anniversaries, memorials, or any special moment.",
    },
]

const Why = () => {
    return (
        <section className="py-24 bg-gradient-dark">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Why Nessy Art?"
                    subtitle="Every portrait is a labor of love"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {features.map((f) => (
                        <FeatureCard
                            key={f.id}
                            icon={f.icon}
                            title={f.title}
                            desc={f.desc}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Why