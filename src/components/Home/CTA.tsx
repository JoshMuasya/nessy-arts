'use client'

import Link from "next/link"
import AnimatedSection from "./AnimatedSection"

const CTA = () => {
    return (
        <section className="py-24 bg-gradient-dark">
            <div className="container mx-auto px-4 text-center">
                <AnimatedSection>
                    <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4">
                        Ready to Immortalize Your <span className="text-gradient-gold">Memories</span>?
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Commission a custom portrait today and give someone the most meaningful gift they'll ever receive.
                    </p>
                    <Link
                        href="/order"
                        className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg"
                    >
                        Order Your Portrait
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    )
}

export default CTA