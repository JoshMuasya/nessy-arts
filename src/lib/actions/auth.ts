
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { uploadImage } from "../utils/uploadImage";

export const registerUser = async ({ name, email, password, profileImage }: { name: string; email: string; password: string; profileImage: File }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);

    console.log("Password", password)

    const imageUrl = await uploadImage(profileImage);

    await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
            uid: cred.user.uid,
            name,
            password,
            email,
            profileImage: imageUrl,
        }),
    });

    return cred.user;
};

export const loginUser = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    const idToken = await cred.user.getIdToken();

    await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            token: idToken,
        }),
    });

    return cred.user;
};

export const logoutUser = async () => {
    await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
    });
};