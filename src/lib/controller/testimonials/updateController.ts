import { updateTestimonial } from "@/lib/services/testimonials/updateTestimonials";
import { updateTestimonialSchema } from "@/lib/validators/testimonialsSchema";
import { ZodError } from "zod";

export async function updateTestimonialController(req: Request, params?: Promise<{ id: string }>) {
    try {
        const body = await req.json();
        const id = (await params)?.id || body.id;

        if (!id) {
            return Response.json(
                { success: false, error: "Invalid Testimonial ID" },
                { status: 400 }
            )
        }

        const validated = updateTestimonialSchema.parse(body);

        const result = await updateTestimonial(id, validated);

        if (!result?.success) {
            return Response.json(
                { success: false, error: result },
                { status: 404 }
            )
        }

        return Response.json(
            { success: true, data: result.data },
            { status: 200 }
        );
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