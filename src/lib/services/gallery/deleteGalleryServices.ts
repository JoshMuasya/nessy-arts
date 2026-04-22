import { db } from "@/lib/firebase/firebase"
import { deleteDoc, doc, getDoc } from "firebase/firestore"

export async function deleteGalleryService(id: string) {
    const docRef = doc(db, "gallery", id)

    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
        return {
            success: false,
            error: "Gallery not found"
        }
    }

    await deleteDoc(docRef)

    return {
        success: true,
        message: "Gallery deleted successfully",
        data: id
    }
}