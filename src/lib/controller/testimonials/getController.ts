
import { getTestimonialById, getTestimonials } from "@/lib/services/testimonials/getTestimonials";
import { testimonialIdSchema } from "@/lib/validators/testimonialsSchema";
import { ZodError } from "zod";

export async function getTestimonialsController() {
    try {
        const result = await getTestimonials()

        return Response.json(
            { success: true, result },
            { status: 200 }
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

export async function getTestimonialByIdController(
    params: { id: string }
) {
    try {
        const id = params.id

        if (!id) {
            return Response.json(
                { success: false, error: "Invalid ID" },
                { status: 400 }
            )
        }

        testimonialIdSchema.parse({ id })

        const result = await getTestimonialById(id)

        if (!result?.success) {
            return Response.json(
                { success: false, error: result },
                { status: 404 }
            )
        }

        return Response.json(
            { success: true, data: result },
            { status: 200 }
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