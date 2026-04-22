import { createGalleryController } from "@/lib/controller/gallery/createControllers";
import { getGalleriesController } from "@/lib/controller/gallery/getControllers";

export async function GET() {
    return getGalleriesController()
}

export async function POST(req: Request) {
    return createGalleryController(req)
}