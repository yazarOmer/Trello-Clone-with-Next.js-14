"use server"

import { OrganizationSchema } from "@/schemas"
import * as z from "zod"

import { db } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { Organization } from "@prisma/client"

type ReturnType = {
    id?:string;
    name?:string;
    userId?:string;
    error?: string;
}

export const createOrganization = async (values: z.infer<typeof OrganizationSchema>): Promise<ReturnType> => {
    const session = await auth()
    const validatedFields = OrganizationSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { name } = validatedFields.data

    try {
        const org = await db.organization.create({
            data: {
                name: name as string,
                userId: session?.user?.id as string
            }
        })
    
        revalidatePath("/organization")

        return org
        
    } catch (error) {
        return { error: "Failed to create organization" }
    }
}