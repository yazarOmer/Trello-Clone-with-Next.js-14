"use server"

import { db } from "@/lib/db"
import { UpdateListSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import * as z from "zod"

export const updateList = async (data: z.infer<typeof UpdateListSchema>) => {
    const { title, id, boardId, orgId } = data
    
    let list

    try {
        list = await db.list.update({
            where: {
                id,
                boardId,
            },
            data: {
                title
            }
        })
    } catch (error) {
        return {
            error: "Failed to update"
        }
    }

    revalidatePath(`/organization/${orgId}/board/${boardId}`)
    return list
}