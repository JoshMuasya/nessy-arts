"use client"

import CountUp from "../CountUp"
import AnimatedSection from "../Home/AnimatedSection"
import SectionHeading from "../Home/SectionHeading"

const About = () => {
    return (
        <div className="pt-24 pb-16 min-h-screen">
            <div className="container mx-auto px-4">
                <SectionHeading title="Our Story" subtitle="The art of preserving memories" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                    <AnimatedSection>
                        <div className="rounded-xl overflow-hidden">
                            <img src="/about.jpg" alt="Portrait artwork" loading="lazy" className="w-full h-auto" width={1024} height={1280} />
                        </div>
                    </AnimatedSection>
                    <AnimatedSection delay={0.2}>
                        <h3 className="font-display text-2xl font-semibold mb-4 text-gradient-gold">The Heart Behind Every Stroke</h3>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Nessy Art was born from a deep belief that every face tells a story, and every story deserves to be preserved in its most beautiful form. What started as a personal passion for pencil sketching has grown into a studio dedicated to turning your most precious photographs into handcrafted works of art.
                            </p>
                            <p>
                                Each portrait begins with careful study — understanding not just the physical features, but the emotion, the personality, and the moment captured in your photo. Using traditional pencil and charcoal techniques refined over years of practice, every stroke is placed with intention.
                            </p>
                            <p>
                                We believe that in an age of digital everything, there's something profoundly meaningful about a hand-drawn portrait. It's not just art — it's a connection to the people and moments that matter most.
                            </p>
                        </div>
                        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                            {[
                                { to: 500, suffix: "+", label: "Portraits" },
                                { to: 98, suffix: "%", label: "Satisfaction" },
                                { to: 3, suffix: "+", label: "Years" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="bg-gradient-card border border-border rounded-xl p-5 
                 shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <p className="font-display text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-400">
                                        <CountUp
                                            to={s.to}
                                            duration={2}
                                            separator=","
                                            className=""
                                        />
                                        {s.suffix}
                                    </p>

                                    <p className="text-xs text-muted-foreground mt-2 tracking-wide uppercase">
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </div>
    )
}

export default About