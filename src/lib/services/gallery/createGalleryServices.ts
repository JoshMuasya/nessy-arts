import { db } from "@/lib/firebase/firebase"
import { addDoc, collection } from "firebase/firestore"

export const createGalleryService = async (data: any) => {
    const createdAt = new Date()

    const docRef = await addDoc(collection(db, "gallery"), {
        ...data,
        createdAt
    })

    return {
        id: docRef.id,
        ...data,
        createdAt,
    }
}