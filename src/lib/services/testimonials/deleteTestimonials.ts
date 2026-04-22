import { db } from "@/lib/firebase/firebase"
import { deleteDoc, doc, getDoc } from "firebase/firestore"

export async function deleteTestimonial(id: string) {
    const docRef = doc(db, "testimonials", id)

    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
        return {
            success: false,
            error: "Testimonial not found"
        }
    }

    await deleteDoc(docRef)

    return {
        success: true,
        message: "Testimonial deleted successfully",
        data: id
    }
}