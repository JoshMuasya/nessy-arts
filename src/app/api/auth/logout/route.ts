import { logoutController } from "@/lib/controller/authController";

export async function POST() {
    return logoutController();
}