"use server"

import { CreateCardSchema } from "@/schemas"
import * as z from "zod"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const createCard = async (data: z.infer<typeof CreateCardSchema>): Promise<any> => {

    const validatedFields = CreateCardSchema.safeParse(data)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { title, boardId, listId, orgId } = validatedFields.data
    let card

    try {
        const list = await db.list.findUnique({
            where: {
                id: listId,
                board: {
                    orgId
                }
            }
        })

        if (!list) {
            return {
                error: "List not found"
            }
        }

        const lastCard = await db.card.findFirst({
            where: {
                listId
            },
            orderBy: {order: "desc"},
            select: { order: true }
        })

        const newOrder = lastCard ? lastCard.order + 1 : 1


        card = await db.card.create({
            data: {
                title,
                listId,
                order: newOrder
            }
        })
    
        revalidatePath(`/organization/${orgId}/board/${boardId}`)
        return card
    } catch (error) {
        return { error: "Failed to create card" }
        
    }

}