import { adminAuth, adminDb } from "../firebase/firebase-admin";


export const requireRole = (roles: string[]) => {
    return async (req: Request) => {
        const token = req.headers.get("authorization")?.split("Bearer ")[1];

        if (!token) throw new Error("Unauthorized");

        const decoded = await adminAuth.verifyIdToken(token);

        const userDoc = await adminDb.collection("users").doc(decoded.uid).get();
        const user = userDoc.data();

        if (!user || !roles.includes(user.role)) {
            throw new Error("Forbidden");
        }

        return user;
    };
};