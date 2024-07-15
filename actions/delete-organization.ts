"use server"

import * as z from "zod"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { DeleteOrganizationSchema } from "@/schemas"


export const deleteOrganization = async (data: z.infer<typeof DeleteOrganizationSchema>) => {
    const { orgId } = data

    let organization

    try {
        organization = await db.organization.delete({
            where: {
                id: orgId
            }
        })
    } catch (error) {
        return {
            error: "Failed to delete"
        }
    }

    revalidatePath(`/organization/${orgId}`)
}