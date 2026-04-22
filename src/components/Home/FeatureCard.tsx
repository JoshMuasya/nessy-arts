"use client"

import { useRef } from "react"
import AnimatedSection from "./AnimatedSection"

interface FeatureCardProps {
    icon: React.ElementType
    title: string
    desc: string
    index?: number
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    icon: Icon,
    title,
    desc,
    index = 0
}) => {
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current
        if (!card) return

        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = -(y - centerY) / 10
        const rotateY = (x - centerX) / 10

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.03)
        `

        // Glow position
        card.style.setProperty("--mouse-x", `${x}px`)
        card.style.setProperty("--mouse-y", `${y}px`)
    }

    const handleMouseLeave = () => {
        const card = cardRef.current
        if (!card) return

        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    }

    return (
        <AnimatedSection delay={index * 0.15}>
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative group bg-gradient-card border border-border rounded-xl p-8 text-center transition-all duration-300 overflow-hidden"
            >
                {/* Glow effect */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
                    style={{
                        background: `
      radial-gradient(
        260px circle at var(--mouse-x) var(--mouse-y),
        oklch(0.72 0.16 75 / 0.18),
        oklch(0.72 0.16 75 / 0.10) 30%,
        transparent 65%
      )
    `
                    }}
                />

                {/* Content */}
                <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300">
                        <Icon className="w-6 h-6 text-primary transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:-translate-y-1" />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {desc}
                    </p>
                </div>
            </div>
        </AnimatedSection>
    )
}

export default FeatureCard