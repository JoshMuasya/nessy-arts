import { db } from "@/lib/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function updateTestimonial(id: string, data: Partial<{ fullName: string; testimonial: string; rating: number; date: string; }>) {
    const docRef = doc(db, "testimonials", id)

    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
        return {
            success: false,
            error: "Testimonial not found"
        }
    }

    await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
    })

    return {
        success: true,
        data: {
            id,
            ...data,
            updatedAt: new Date(),
        }
    }
}