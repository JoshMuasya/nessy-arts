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
import { ChevronLeft, ChevronRight } from "lucide-react"

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [slider, setSlider] = useState<Slider | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                setLoading(true)

                const res = await fetch("/api/testimonials")
                if (!res.ok) throw new Error()

                const data = await res.json()
                setTestimonials(data.result.data)
            } catch {
                setTestimonials([])
                toast.error("Failed to load testimonials")
            } finally {
                setLoading(false)
            }
        }

        fetchTestimonials()
    }, [])

    const settings = {
        dots: true,
        infinite: testimonials.length > 1,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,

        appendDots: (dots: React.ReactNode) => (
            <div className="mt-4">
                <ul className="flex justify-center gap-2">
                    {dots}
                </ul>
            </div>
        ),

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: "40px",
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: "20px",
                },
            },
        ],
    }

    return (
        <section className="py-16 md:py-24 bg-black/5">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="What Clients Say"
                    subtitle="Stories from our happy customers"
                />

                <div className="relative mt-10">
                    <Slider
                        {...settings}
                        ref={(s) => setSlider(s)}
                        className="-mx-2 md:-mx-4"
                    >
                        {testimonials.map((t, i) => (
                            <div
                                key={t.id}
                                className="px-2 md:px-4"
                            >
                                <AnimatedSection delay={i * 0.1}>
                                    <BorderGlow
                                        className="
                                            p-4 md:p-6
                                            min-h-[220px] md:min-h-[260px]
                                            max-w-[320px]
                                            mx-auto
                                            flex flex-col justify-between
                                            transition-transform
                                            hover:scale-[1.02]
                                            shadow-lg
                                        "
                                        borderRadius={20}
                                        glowRadius={60}
                                        glowIntensity={1.5}
                                        edgeSensitivity={30}
                                        animated
                                        colors={[
                                            "#FFD700",
                                            "#FFD700",
                                            "#6A0DAD",
                                        ]}
                                    >
                                        <p className="text-xs md:text-sm text-foreground/80 leading-relaxed italic mb-4 flex-1">
                                            "{t.testimonial}"
                                        </p>

                                        <div>
                                            <p className="font-display font-semibold text-primary text-sm">
                                                {t.fullName}
                                            </p>

                                            <p className="text-xs text-yellow-500 mt-2">
                                                ⭐ {t.rating}/5
                                            </p>

                                            <p className="text-xs text-muted-foreground mt-1">
                                                {new Date(
                                                    t.date
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </BorderGlow>
                                </AnimatedSection>
                            </div>
                        ))}
                    </Slider>

                    {/* Desktop arrows only */}
                    <div className="hidden md:flex justify-center gap-4 mt-8">
                        <button
                            onClick={() => slider?.slickPrev()}
                            className="bg-gradient-to-r from-[#FFD700]/80 via-[#FFC700] to-[#FFD700] text-black rounded-full p-3 shadow-lg hover:scale-110 transition"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <button
                            onClick={() => slider?.slickNext()}
                            className="bg-gradient-to-r from-[#FFD700]/80 via-[#FFC700] to-[#FFD700] text-black rounded-full p-3 shadow-lg hover:scale-110 transition"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials