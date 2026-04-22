import { db } from "@/lib/firebase/firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"

export const getTestimonials = async () => {
    const snapshot = await getDocs(collection(db, "testimonials"))

    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    return {
        success: true,
        data
    }
}

export const getTestimonialById = async (id: string) => {
    const docSnap = await getDoc(doc(db, "testimonials", id))

    if (!docSnap.exists()) {
        return null
    }

    const data = docSnap.data()

    return {
        success: true,
        data
    }
}