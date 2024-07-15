import { db } from "@/lib/db"

export const getListsByBoardId = async (boardId: string) => {
    try {
        const lists = await db.list.findMany({
            where: {
                boardId
            },
            include: {
                cards: {
                    orderBy: {
                        order: "asc"
                    }
                }
            },
            orderBy: {
                order: "asc"
            }
        })

        return lists
    } catch (error) {
        console.log(error)
    }
}