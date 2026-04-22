
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";

export const uploadImage = async (file: File) => {
    const fileRef = ref(storage, `profiles/${Date.now()}-${file.name}`);

    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
};

export const uploadGalleryImage = async (file: File) => {
    const fileRef = ref(storage, `gallery/${Date.now()}-${file.name}`);

    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
};