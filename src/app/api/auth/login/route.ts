import { loginController } from "@/lib/controller/authController";


export async function POST(request: Request) {
    return loginController(request);
}