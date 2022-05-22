import type {
    QueryUsersResponse,
    QueryThreadsResponse,
    QueryThreadResponse,
} from "../../types/index"
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
            data: users,
        }

        try {
            const dbUsers = await usersClx.getUsers()
            res.message = `Found ${dbUsers.length} Users`
            res.data = dbUsers
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
            data: threads,
        }

        try {
            const dbThreads = await threadsClx.getThreads()
            res.message = `Found ${dbThreads.length} threads`
            res.data = dbThreads
        } catch (error) {
            res.success = false
            res.message = getErrorMessage(error)
        }
        return res
    },
    thread: async (
        parent: any,
        { id }: { id: string },
        { dataSources: { threadsClx } }: any,
    ): Promise<QueryThreadResponse> => {
        const res: QueryThreadResponse = {
            success: true,
            message: "",
            data: undefined,
        }

        try {
            const dbThread : Thread = await threadsClx.getThread(id)
            res.message = `Found thread ${dbThread?._id?.toString()}`
            res.data = dbThread
        } catch (error) {
            res.success = false
            res.message = getErrorMessage(error)
        }
        return res
    },
}
