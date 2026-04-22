
export interface GalleryItem {
    id: string;
    title: string;
    imageUrl: string;
    category: "pencil" | "charcoal" | "couple" | "pets";
    createdAt: string;
}

export interface Testimonial {
    id: string;
    name: string;
    message: string;
    imageUrl?: string;
    createdAt: string;
}

export const defaultGalleryItems: GalleryItem[] = [
    { id: "1", title: "The Elder", imageUrl: "/gallery.jpg", category: "pencil", createdAt: "2025-01-15" },
    { id: "2", title: "Eternal Bond", imageUrl: "/gallery2.jpg", category: "couple", createdAt: "2025-02-10" },
    { id: "3", title: "Loyal Friend", imageUrl: "/gallery2.jpg", category: "pets", createdAt: "2025-03-05" },
    { id: "4", title: "Pure Joy", imageUrl: "/gallery.jpg", category: "charcoal", createdAt: "2025-03-20" },
    { id: "5", title: "Elegance", imageUrl: "/gallery.jpg", category: "pencil", createdAt: "2025-04-01" },
    { id: "6", title: "Midnight Gaze", imageUrl: "/gallery.jpg", category: "pets", createdAt: "2025-04-15" },
];

export const defaultTestimonials: Testimonial[] = [
    {
        id: "1",
        name: "Aisha Mwangi",
        message: "Nessy Art captured my grandmother's essence perfectly. Every wrinkle, every smile line — it's like she's right here with us. This portrait is our family's most treasured possession.",
        createdAt: "2025-01-20",
    },
    {
        id: "2",
        name: "James Kamau & Emily Njeri",
        message: "We commissioned a couple portrait for our wedding anniversary. The emotion and detail blew us away. It hangs in our living room, and every guest asks about it.",
        createdAt: "2025-02-15",
    },
    {
        id: "3",
        name: "David Otieno",
        message: "After losing our dog Simba, we wanted something to remember him by. The portrait Nessy created was so lifelike, it brought tears to our eyes. Absolutely incredible work.",
        createdAt: "2025-03-10",
    },
    {
        id: "4",
        name: "Fatuma Hassan",
        message: "I gifted my mother a custom portrait of our family, and she was overwhelmed. Nessy Art’s attention to detail made it feel like a moment frozen in time. Truly exceptional.",
        createdAt: "2025-03-18",
    },
];

export const pricingPlans = [
    { size: "A5", dimensions: '5.8" × 8.3"', price: 49, description: "Perfect for desk frames" },
    { size: "A4", dimensions: '8.3" × 11.7"', price: 79, description: "Most popular size" },
    { size: "A3", dimensions: '11.7" × 16.5"', price: 129, description: "Great for wall display" },
    { size: "A2", dimensions: '16.5" × 23.4"', price: 199, description: "Statement piece" },
];

// Simple localStorage-based store
export function getGalleryItems(): GalleryItem[] {
    const stored = localStorage.getItem("nessy-gallery");
    return stored ? JSON.parse(stored) : defaultGalleryItems;
}

export function saveGalleryItems(items: GalleryItem[]) {
    localStorage.setItem("nessy-gallery", JSON.stringify(items));
}

export function getTestimonials(): Testimonial[] {
    const stored = localStorage.getItem("nessy-testimonials");
    return stored ? JSON.parse(stored) : defaultTestimonials;
}

export function saveTestimonials(items: Testimonial[]) {
    localStorage.setItem("nessy-testimonials", JSON.stringify(items));
}
