import { adminAuth, adminDb } from "../firebase/firebase-admin";

export const authServices = {
    async register({ uid, name, email, password, profileImage }: { uid?: string; name: string; email: string; password: string; profileImage?: string; }) {
        try {
            let userUid = uid;

            if (!userUid) {
                const userRecord = await adminAuth.createUser({
                    email: email,
                    password: password,
                    displayName: name,
                    photoURL: profileImage
                });
                userUid = userRecord.uid;
            } else {
                // If UID exists, update the Auth record to ensure consistency
                await adminAuth.updateUser(userUid, {
                    displayName: name,
                    photoURL: profileImage,
                });
            }

            const user = {
                uid: userUid,
                name: name,
                email: email,
                profileImage: profileImage,
                createdAt: new Date()
            };

            await adminDb.collection("users").doc(userUid).set(user)

            return {
                success: true,
                user: user
            }
        } catch (error: any) {
            console.log("FIREBASE AUTH ERROR:", error.code, error.message);

            if (error.code === "auth/email-already-exists") {
                throw new Error("EMAIL_EXISTS");
            }

            throw error;
        }
    },

    async getUser(uid: string) {
        const doc = await adminDb.collection("users").doc(uid).get();
        if (!doc.exists) {
            return null;
        }
        return doc.data();
    }
}