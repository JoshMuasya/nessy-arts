"use client"

import { AnimatePresence, motion } from "framer-motion"
import SectionHeading from "../Home/SectionHeading"
import { useEffect, useState } from "react"
import Masonry from "../Masonry"
import { toast } from "sonner"

const Gallery = () => {
    const [filter, setFilter] = useState<string>("all");
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
        <div className="pt-24 pb-16 min-h-screen">
            <div className="container mx-auto px-4">
                <SectionHeading title="Our Gallery" subtitle="Browse our collection of handcrafted portraits" />

                {/* Filters */}
                {/* <div className="flex justify-center gap-3 mb-12 flex-wrap">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setFilter(c)}
                            className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-colors ${filter === c
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div> */}

                {/* Masonry Grid */}
                <motion.div
                    key={filter}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Masonry
                        items={gallery.map((item) => ({
                            id: item,
                            img: item,
                            url: "#",
                            height: 400 + Math.random() * 300
                        }))}
                        animateFrom="center"
                        scaleOnHover
                        hoverScale={0.95}
                        blurToFocus
                        colorShiftOnHover
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default Gallery