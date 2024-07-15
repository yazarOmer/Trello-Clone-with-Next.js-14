import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please provide a valid email"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please provide a valid email"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required",
    })
})

export const OrganizationSchema = z.object({
    name: z.string().min(1, {
        message: "Organization name is required"
    })
})

export const BoardSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    orgId: z.string(),
    image: z.string({
        required_error: "Image is required",
    })
})

export const UpdateBoardSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    id: z.string(),
    orgId: z.string()
})

export const DeleteBoardSchema = z.object({
    id: z.string(),
    orgId: z.string()
})

export const DeleteOrganizationSchema = z.object({
    orgId: z.string()
})

export const ListSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    orgId: z.string(),
    boardId: z.string()
})