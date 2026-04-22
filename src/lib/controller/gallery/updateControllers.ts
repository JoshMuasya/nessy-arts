import { updateGalleryService } from "@/lib/services/gallery/updateGalleryServices"
import { updateGallerySchema } from "@/lib/validators/gallerySchema"
import { ZodError } from "zod"

export async function updateGalleryController(req: Request, params?: Promise<{ id: string }>) {
    try {
        const body = await req.json()
        const id = (await params)?.id || body.id

        if (!id) {
            return Response.json(
                { success: false, error: "Invalid Gallery ID" },
                { status: 400 }
            )
        }

        const validated = updateGallerySchema.parse(body)

        const result = await updateGalleryService(id, validated)

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