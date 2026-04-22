"use client";

import { getGalleryItems, getTestimonials } from "@/lib/data";
import { Image, MessageSquare, Upload } from "lucide-react";

const Dashboard = () => {
    const gallery = getGalleryItems();
    const testimonials = getTestimonials();

    const cards = [
        {
            label: "Total Artworks",
            value: gallery.length,
            icon: Image,
        },
        {
            label: "Total Testimonials",
            value: testimonials.length,
            icon: MessageSquare,
        },
        {
            label: "Recent Uploads",
            value: gallery.filter((g) => {
                const d = new Date(g.createdAt);
                const now = new Date();
                return now.getTime() - d.getTime() < 30 * 24 * 60 * 60 * 1000;
            }).length,
            icon: Upload,
        },
    ];

    return (
        <div>
            <h1 className="font-display text-2xl font-semibold text-foreground mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className="bg-card border border-border rounded-xl p-6 flex items-center gap-4"
                    >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <card.icon size={22} />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-foreground">{card.value}</p>
                            <p className="text-sm text-muted-foreground">{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;