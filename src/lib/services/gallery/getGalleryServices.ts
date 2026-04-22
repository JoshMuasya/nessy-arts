import { db } from "@/lib/firebase/firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"

export const getGalleryService = async () => {
    const snapshot = await getDocs(collection(db, "gallery"))

    const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    return {
        success: true,
        data
    }
}

export const getGalleryByIdService = async (id: string) => {
    const docSnap = await getDoc(doc(db, "gallery", id))

    if (!docSnap.exists()) {
        return null
    }

    const data = docSnap.data()

    return {
        success: true,
        data
    }
}