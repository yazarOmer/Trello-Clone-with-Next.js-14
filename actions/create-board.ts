"use server"

import { BoardSchema } from "@/schemas"
import * as z from "zod"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { Board } from "@prisma/client"

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

export const createBoard = async (values: z.infer<typeof BoardSchema>) : Promise<ReturnType> => {

    const validatedFields = BoardSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const { title, orgId, image } = validatedFields.data

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
    ] = image.split("|")

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
        return {
            error: "Missing fields. Failed to create board"
        }
    }

    try {
        const board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML
            }
        })
        
        revalidatePath(`/organization/${orgId}`)
        return board
    } catch (error) {
        return { error: "Failed to create"}
    }
    
}