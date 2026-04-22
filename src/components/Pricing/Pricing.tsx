"use client"

import Link from "next/link"
import AnimatedSection from "../Home/AnimatedSection"
import { Check } from "lucide-react"
import SectionHeading from "../Home/SectionHeading"
import { pricingPlans } from "@/lib/data"
import BorderGlow from "../BorderGlow"

const Pricing = () => {
    return (
        <div className="pt-24 pb-16 min-h-screen">
            <div className="container mx-auto px-4">
                <SectionHeading title="Pricing" subtitle="Choose the perfect size for your portrait" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {pricingPlans.map((plan, i) => (
                        <AnimatedSection key={plan.size} delay={i * 0.1}>
                            <BorderGlow
                                glowColor="280 80 70"       // purple-ish glow
                                glowRadius={30}
                                glowIntensity={1.2}
                                borderRadius={24}
                                edgeSensitivity={25}
                                animated={false}           // or true if you want auto sweep
                                className="h-full flex flex-col"
                            >
                                <div className={`bg-gradient-card border rounded-xl p-6 text-center h-full flex flex-col ${plan.size === "A4" ? "border-primary ring-1 ring-primary/30" : "border-border"
                                    }`}>
                                    {plan.size === "A4" && (
                                        <span className="text-xs font-medium text-primary uppercase tracking-wider mb-2">Most Popular</span>
                                    )}
                                    <h3 className="font-display text-3xl font-bold mb-1">{plan.size}</h3>
                                    <p className="text-xs text-muted-foreground mb-4">{plan.dimensions}</p>
                                    <p className="font-display text-4xl font-bold text-primary mb-2">${plan.price}</p>
                                    <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                                    <ul className="text-sm text-muted-foreground space-y-2 mb-6 text-left flex-1">
                                        {["Handcrafted portrait", "Premium paper", "Free revisions", "Secure packaging"].map((f) => (
                                            <li key={f} className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-primary flex-shrink-0" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={`/order?size=${plan.size}`}
                                        className="block w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity text-center"
                                    >
                                        Order Now
                                    </Link>
                                </div>
                            </BorderGlow>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Pricing