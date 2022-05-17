import type { QueryUsersResponse, QueryThreadsResponse } from "../../types/index"
import type { User, Thread } from "../../types/index"
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
    threads: async (
        parent: any,
        _: any,
        { dataSources: { threadsClx } }: any,
    ): Promise<QueryThreadsResponse> => {
        const threads: Thread[] = []
        const res: QueryThreadsResponse = {
            success: true,
            message: "",
            threads,
        }

        try {
            const dbThreads = await threadsClx.getThreads()
            console.log("dbThreads",dbThreads)
            res.message = `Found ${dbThreads.length} threads`
            res.threads = dbThreads
        } catch (error: unknown) {
            res.success = false
            res.message = getErrorMessage(error)
        }
        return res
    }
}
