"use server"

import * as z from "zod"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { ListSchema } from "@/schemas"

type ReturnType = {
    id?: string;
    title?: string;
    order?: number;
    boardId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    error?: string;
}

export const createList = async (values: z.infer<typeof ListSchema>) : Promise<ReturnType> => {

    const validatedFields = ListSchema.safeParse(values)

    console.log(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { title, boardId, orgId } = validatedFields.data

    try {

        const lastList = await db.list.findFirst({
            where: { boardId },
            orderBy: { order: "desc" },
            select: { order: true}
        })

        const newOrder = lastList ? lastList.order + 1 : 1

        const list = await db.list.create({
            data: {
                title, boardId, order: newOrder
            }
        })
    
        revalidatePath(`/organization/${orgId}/board/${boardId}`)

        return list
        
    } catch (error) {
        return { error: "Failed to create list" }
    }
}