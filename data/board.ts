import { db } from "@/lib/db"

export const getBoards = async (orgId: string)  => {
    try {
        const boards = await db.board.findMany({
            where: { orgId }
        })

        return boards
    } catch (error) {
        console.log(error)
    }
}

export const getBoardById = async (id: string) => {
    try {
        const board = await db.board.findUnique({
            where: {
                id
            }
        })

        return board
    } catch (error) {
        console.log(error)
    }
}