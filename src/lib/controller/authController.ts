import { cookies } from "next/headers";
import { adminAuth } from "../firebase/firebase-admin";
import { authServices } from "../services/authServices";
import { registerSchema } from "../validators/userSchema";
import { NextResponse } from "next/server";

export const registerController = async (req: Request) => {
    try {
        const body = await req.json();

        const validated = registerSchema.safeParse(body);

        if (!validated.success) {
            console.error("Registration validation failed:", validated.error.issues);
            return Response.json(
                { success: false, error: "Invalid data", details: validated.error.issues },
                { status: 400 }
            );
        }

        const user = await authServices.register(validated.data)

        return Response.json(user, { status: 201 })
    } catch (err: any) {
        console.error("Error registering user:", err);
        return Response.json(
            { error: err.message || "Failed to register user" },
            { status: err.message === "EMAIL_EXISTS" ? 400 : 500 }
        );
    }
}

export const loginController = async (req: Request) => {
    try {
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json(
                { error: "Token is required" },
                { status: 400 }
            );
        }

        await adminAuth.verifyIdToken(token);

        const response = NextResponse.json(
            { success: true },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }
};

export const meController = async () => {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const decoded = await adminAuth.verifyIdToken(token);

        const user = await authServices.getUser(decoded.uid);

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        const userDt = {
            uid: user.uid || decoded.uid,
            email: user.email,
            name: user.name,
            photoURL: user.photoURL,
            createdAt: user.createdAt
        };

        return Response.json({ success: true, user: userDt }, { status: 200 });
    } catch (err: any) {
        console.error("Error fetching user:", err);
        return Response.json(
            { error: err.message || "Failed to fetch user" },
            { status: 401 }
        );
    }
};

export const logoutController = async () => {
    const response = NextResponse.json({ success: true });

    response.cookies.set("token", "", {
        httpOnly: true,
        path: "/",
        maxAge: 0,
    });

    return response;
};