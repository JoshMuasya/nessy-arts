import { db } from "@/lib/firebase/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"

export const updateGalleryService = async (id: string, data: any) => {
    const docRef = doc(db, "gallery", id)

    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
        return {
            success: false,
            error: "Gallery not found"
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