import {
    type UsersResponse,
    type ThreadsResponse,
    type ThreadResponse,
    type User,
    type Thread,
    ActionType,
} from "../../types/gql.js"
import { getErrorMessage } from "../../util/errors"

export default {
    users: async (
        parent: any,
        _: any,
        { dataSources: { usersClx } }: any,
    ): Promise<UsersResponse> => {
        const users: User[] = []
        const res: UsersResponse = {
            action: ActionType.Read,
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
    ): Promise<ThreadsResponse> => {
        const threads: Thread[] = []
        const res: ThreadsResponse = {
            action: ActionType.Read,
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
    ): Promise<ThreadResponse> => {
        const res: ThreadResponse = {
            action: ActionType.Read,
            success: true,
            message: "",
            data: undefined,
        }

        try {
            const dbThread: Thread = await threadsClx.getThread(id)
            res.message = `Found thread ${dbThread?._id?.toString()}`
            res.data = dbThread
        } catch (error) {
            res.success = false
            res.message = getErrorMessage(error)
        }
        return res
    },
}
