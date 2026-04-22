'use client'

import BorderGlow from "../BorderGlow"
import AnimatedSection from "./AnimatedSection"
import SectionHeading from "./SectionHeading"
import Slider from "react-slick"
import { useEffect, useState } from "react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Testimonial } from "../dashboard/TestimonialsPage"
import { toast } from "sonner"

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [slider, setSlider] = useState<Slider | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setLoading(true);

                const res = await fetch("/api/testimonials");
                if (!res.ok) throw new Error();

                const data = await res.json();
                setTestimonials(data.result.data);
            } catch {
                setTestimonials([]); // prevent crash
                toast.error("Failed to load testimonials");
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        appendDots: (dots: React.ReactNode) => (
            <div className="mt-6">
                <ul className="flex justify-center gap-3">{dots}</ul>
            </div>
        ),
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    }

    return (
        <section className="py-24 bg-black/5">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="What Clients Say"
                    subtitle="Stories from our happy customers"
                />

                <div className="relative">
                    <Slider {...settings} ref={(s) => setSlider(s)} className="-mx-4">
                        {testimonials.map((t, i) => (
                            <div key={t.id} className="px-4">
                                <AnimatedSection delay={i * 0.15}>
                                    <BorderGlow
                                        className="p-8 flex flex-col justify-between transition-transform hover:scale-105 shadow-lg"
                                        borderRadius={20}
                                        glowRadius={60}
                                        glowIntensity={1.5}
                                        edgeSensitivity={30}
                                        animated
                                        colors={["#FFD700", "#FFD700", "#6A0DAD"]}
                                    >
                                        <p className="text-foreground/80 text-sm leading-relaxed italic mb-6 flex-1">
                                            "{t.testimonial}"
                                        </p>
                                        <p className="font-display font-semibold text-primary mt-4">
                                            {t.fullName}
                                        </p>

                                        <p className="text-xs text-yellow-500 mt-1">
                                            ⭐ {t.rating}/5
                                        </p>

                                        <p className="text-xs text-muted-foreground mt-1">
                                            {new Date(t.date).toLocaleDateString()}
                                        </p>
                                    </BorderGlow>
                                </AnimatedSection>
                            </div>
                        ))}
                    </Slider>

                    {/* Centered Arrows */}
                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            onClick={() => slider?.slickPrev()}
                            className="bg-gradient-to-r from-[#FFD700]/80 via-[#FFC700] to-[#FFD700] text-black rounded-full p-3 shadow-lg hover:scale-110 transition"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => slider?.slickNext()}
                            className="bg-gradient-to-r from-[#FFD700]/80 via-[#FFC700] to-[#FFD700] text-black rounded-full p-3 shadow-lg hover:scale-110 transition"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials