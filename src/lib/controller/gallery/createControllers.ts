import { createGalleryService } from "@/lib/services/gallery/createGalleryServices";
import { createGallerySchema } from "@/lib/validators/gallerySchema";
import { ZodError } from "zod";

export async function createGalleryController(req: Request) {
    try {
        const body = await req.json()

        const validated = createGallerySchema.parse(body)

        const gallery = await createGalleryService(validated)

        return Response.json(
            { success: true, gallery },
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