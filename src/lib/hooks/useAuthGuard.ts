"use client";

import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, UserProfile } from "firebase/auth";

export function useAuth() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            const token = await firebaseUser.getIdToken();

            const res = await fetch("/api/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                setUser(null);
                setLoading(false);
                return;
            }

            const data: UserProfile = await res.json();
            console.log("Auth User Data:", data);

            setUser(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, loading };
}