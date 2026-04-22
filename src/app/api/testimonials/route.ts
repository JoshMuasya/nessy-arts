import { createTestimonialController } from "@/lib/controller/testimonials/createController";
import { getTestimonialsController } from "@/lib/controller/testimonials/getController";

export async function GET() {
    return getTestimonialsController()
}

export async function POST(req: Request) {
    return createTestimonialController(req)
}