"use server"

import { db } from "@/lib/db"
import { UpdateBoardSchema } from "@/schemas"
import { revalidatePath } from "next/cache"
import * as z from "zod"

type ReturnType = {
    id?: string;
    orgId?: string;
    title?: string;
    imageId?: string;
    imageThumbUrl?: string;
    imageFullUrl?: string;
    imageUserName?: string;
    imageLinkHTML?: string;
    createdAt?: Date;
    updatedAt?: Date;
    error?: string
}

export const updateBoard = async (data: z.infer<typeof UpdateBoardSchema>): Promise<ReturnType> => {
    const { title, id, orgId } = data

    let board

    try {
        board = await db.board.update({
            where: {
                id
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

    revalidatePath(`/organization/${orgId}/board/${id}`)
    return board
}