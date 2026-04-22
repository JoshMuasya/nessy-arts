import { deleteGalleryController } from "@/lib/controller/gallery/deleteControllers";
import { updateGalleryController } from "@/lib/controller/gallery/updateControllers";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    return updateGalleryController(req, params)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    return deleteGalleryController(req, params)
}