import { createTestimonial } from "@/lib/services/testimonials/createTestimonials"
import { createtestimonialSchema } from "@/lib/validators/testimonialsSchema"
import { ZodError } from "zod";

export async function createTestimonialController(req: Request) {
    try {
        const body = await req.json()

        const validated = createtestimonialSchema.parse(body)

        const testimonial = await createTestimonial(validated)

        return Response.json(
            { success: true, testimonial },
            { status: 201 }
        )
    } catch (error) {
        if (error instanceof ZodError) {
            return Response.json(
                { success: false, error: error },
                { status: 400 }
            );
        }

        return Response.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}