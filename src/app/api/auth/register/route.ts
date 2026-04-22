import { registerController } from "@/lib/controller/authController";

export async function POST(request: Request) {
    return registerController(request);
}