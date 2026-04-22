"use client"

import Link from "next/link"
import AnimatedSection from "./AnimatedSection"
import SectionHeading from "./SectionHeading"
import { getGalleryItems } from "@/lib/data";
import BounceCards from "../BounceCards";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Gallery = () => {
    const [gallery, setGallery] = useState<string[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                setLoading(true);

                const res = await fetch("/api/gallery");
                if (!res.ok) throw new Error();

                const data = await res.json();
                const imageUrls = data.result.data.map((item: any) => item.imageUrl);
                setGallery(imageUrls);
            } catch (error) {
                setGallery([]);
                toast.error("Failed to load gallery");
            } finally {
                setLoading(false);
            }
        }

        fetchGallery();
    }, []);

    return (
        <section className="py-24">
            <div className="container mx-auto px-4 text-center">
                <SectionHeading
                    title="Featured Works"
                    subtitle="A glimpse into our portfolio"
                />

                <div className="flex justify-center">
                    <div className="w-full max-w-[900px] h-[250px] md:h-[400px] justify-center">
                        <BounceCards
                            images={gallery}
                            enableHover={true}
                        />
                    </div>
                </div>

                <div className="text-center mt-8">
                    <Link
                        href="/gallery"
                        prefetch
                        className="text-primary hover:underline font-medium"
                    >
                        View Full Gallery →
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Gallery