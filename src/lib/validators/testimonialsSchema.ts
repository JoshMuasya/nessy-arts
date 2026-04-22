import { z } from "zod";

const createtestimonialSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    testimonial: z.string().min(1, "Testimonial is required"),
    rating: z.number().min(1, "Rating is required"),
    date: z.string().min(1, "Date is required"),
})

const testimonialIdSchema = z.object({
    id: z.string().min(1, "Id is required"),
})

const updateTestimonialSchema = z.object({
    fullName: z.string().min(1, "Full name is required").optional(),
    testimonial: z.string().min(1, "Testimonial is required").optional(),
    rating: z.number().min(1, "Rating is required").optional(),
    date: z.string().min(1, "Date is required").optional(),
})

export { createtestimonialSchema, testimonialIdSchema, updateTestimonialSchema }