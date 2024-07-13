import { db } from "@/lib/db"

export const getOrganizations = async (userId: string)  => {
    try {
        const organizations = await db.organization.findMany({
            where: { userId }
        })

        return organizations
    } catch (error) {
        console.log(error)
    }
}

export const getOrganizationById = async (orgId: string) => {
    try {
        const organization = await db.organization.findUnique({
            where: {
                id: orgId
            }
        })

        return organization
    } catch (error) {
        console.log(error)
    }
}