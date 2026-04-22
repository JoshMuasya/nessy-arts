import { z } from "zod";

const createGallerySchema = z.object({
    title: z.string().min(1, "Title is required"),
    imageUrl: z.string().min(1, "Image URL is required"),
    category: z.string().min(1, "Category is required"),
})

const galleryIdSchema = z.object({
    id: z.string().min(1, "Id is required"),
})

const updateGallerySchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    imageUrl: z.string().min(1, "Image URL is required").optional(),
    category: z.string().min(1, "Category is required").optional(),
})

export { createGallerySchema, galleryIdSchema, updateGallerySchema }