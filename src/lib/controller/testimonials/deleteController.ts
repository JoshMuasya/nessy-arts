import { deleteTestimonial } from "@/lib/services/testimonials/deleteTestimonials";
import { success, ZodError } from "zod";

export async function deleteTestimonialController(req: Request, params?: Promise<{ id: string }>) {
    try {
        const url = new URL(req.url);
        const id = (await params)?.id || url.searchParams.get("id");

        if (!id) {
            return Response.json(
                { success: false, error: "Id is required" },
                { status: 400 }
            )
        }

        const result = await deleteTestimonial(id)

        if (!result?.success) {
            return Response.json(
                { success: false, error: result },
                { status: 404 }
            )
        }

        return Response.json(
            { success: true, message: "Testimonial deleted successfully" },
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