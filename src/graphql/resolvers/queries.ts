import type { QueryUsersResponse } from "../../types/index"
import type { User, QueryUsersResponseResolvers } from "../../types/index"

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

export default {
    users: async (
        parent: any,
        _: any,
        { dataSources: { usersColl } }: any,
    ): Promise<QueryUsersResponse> => {
        const users: User[] = []
        const res: QueryUsersResponse = {
            success: true,
            message: "",
            users,
        }

        try {
            const dbUsers = await usersColl.getUsers()
            res.message = `Found ${dbUsers.length} Users`
            res.users = dbUsers
        } catch (error: unknown) {
            res.success = false
            res.message = getErrorMessage(error)
        }
        return res
    },
}
// {
//             success: true,
//             message: "ok",
//             users: [...ctx.db.users],
//         }
