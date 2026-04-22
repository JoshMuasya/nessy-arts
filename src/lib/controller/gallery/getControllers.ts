import { getGalleryService, getGalleryByIdService } from "@/lib/services/gallery/getGalleryServices"
import { galleryIdSchema } from "@/lib/validators/gallerySchema";
import { ZodError } from "zod"

export async function getGalleriesController() {
    try {
        const result = await getGalleryService()

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

export async function getGalleryByIdController(params: Promise<{ id: string }>) {
    try {
        const id = (await params).id

        if (!id) {
            return Response.json(
                { success: false, error: "Invalid ID" },
                { status: 400 }
            )
        }

        galleryIdSchema.parse({ id })

        const result = await getGalleryByIdService(id)

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