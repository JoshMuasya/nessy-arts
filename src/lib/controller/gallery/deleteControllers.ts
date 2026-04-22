import { deleteGalleryService } from "@/lib/services/gallery/deleteGalleryServices";
import { ZodError } from "zod";

export async function deleteGalleryController(req: Request, params?: Promise<{ id: string }>) {
    try {
        const url = new URL(req.url);
        const id = (await params)?.id || url.searchParams.get("id");

        if (!id) {
            return Response.json(
                { success: false, error: "Id is required" },
                { status: 400 }
            )
        }

        const result = await deleteGalleryService(id)

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