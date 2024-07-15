"use server"

import * as z from "zod"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { DeleteBoardSchema } from "@/schemas"


export const deleteBoard = async (data: z.infer<typeof DeleteBoardSchema>) => {
    const { id, orgId } = data

    let board

    try {
        board = await db.board.delete({
            where: {
                id
            }
        })
    } catch (error) {
        return {
            error: "Failed to delete"
        }
    }

    revalidatePath(`/organization/${orgId}`)
    redirect(`/organization/${orgId}`)
}