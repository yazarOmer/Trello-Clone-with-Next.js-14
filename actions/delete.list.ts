"use server"

import { db } from "@/lib/db"
import { DeleteListSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import * as z from "zod"

export const deleteList = async (data: z.infer<typeof DeleteListSchema>): Promise<any> => {
    const { id, boardId, orgId } = data

    let list

    try {
        list = await db.list.delete({
            where: {
                id,
                boardId,
                board: {
                    orgId
                }
            }
        })
    } catch (error) {
        return {
            error: "Failed to delete"
        }
    }

    revalidatePath(`/organization/${orgId}/board/${boardId}`)
    return list
}