import UsersCollection from "../../db/data-sources/usersCollection"
import type { QueryUsersResponse } from "../../types/index"
import type { User, QueryUsersResponseResolvers } from "../../types/index"
import { getErrorMessage } from "../../util/errors"

export default {
    users: async (
        parent: any,
        _: any,
        { dataSources: { usersClx } }: any,
    ): Promise<QueryUsersResponse> => {
        const users: User[] = []
        const res: QueryUsersResponse = {
            success: true,
            message: "",
            users,
        }

        try {
            const dbUsers = await usersClx.getUsers()
            res.message = `Found ${dbUsers.length} Users`
            res.users = dbUsers
        } catch (error: unknown) {
            res.success = false
            res.message = getErrorMessage(error)
        }
        return res
    },
}
