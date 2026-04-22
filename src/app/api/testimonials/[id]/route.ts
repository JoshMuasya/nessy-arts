import { deleteTestimonialController } from "@/lib/controller/testimonials/deleteController";
import { updateTestimonialController } from "@/lib/controller/testimonials/updateController";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    return updateTestimonialController(req, params)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    return deleteTestimonialController(req, params)
}