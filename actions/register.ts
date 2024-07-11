"use server"

import * as z from "zod"
import bcryptjs from "bcryptjs"

import { RegisterSchema } from "@/schemas"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields"}
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcryptjs.hash(password, 10);

    const userExist = await getUserByEmail(email)

    if (userExist) {
        return { error: "Email already taken"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { success: "Email sent"}
}