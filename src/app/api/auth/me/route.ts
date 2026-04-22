import { meController } from "@/lib/controller/authController";

export async function GET() {
    return meController();
}