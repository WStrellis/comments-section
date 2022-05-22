import type { AddUserResponse, CreateThreadResponse } from "../../types/index"
import { type InsertOneResult } from "mongodb"
import { getErrorMessage } from "../../util/errors"

export default {
    addUser: async (
        _: any,
        { name }: { name: string },
        ctx: any,
    ): Promise<AddUserResponse> => {
        // add user
        const res: AddUserResponse = {
            success: true,
            message: "",
            data: undefined,
        }
        try {
            const dbRes: InsertOneResult =
                await ctx.dataSources.usersClx.addUser(name)

            res.success = dbRes.acknowledged

            if (dbRes.acknowledged) {
                res.data = {
                    _id: dbRes.insertedId.toString(),
                    name,
                }
                res.message = "Created user " + name
            } else {
                throw new Error(
                    `Could not create user: ${JSON.stringify(dbRes)}`,
                )
            }
        } catch (error) {
            res.message = getErrorMessage(error)
            res.success = false
        }
        return res
    },
    createThread: async (
        _: any,
        { title }: { title: string },
        ctx: any,
    ): Promise<CreateThreadResponse> => {
        // add user
        const res: CreateThreadResponse = {
            success: true,
            message: "",
            data: undefined,
        }
        // let createdOK = false
        try {
            const insertRes: InsertOneResult =
                await ctx.dataSources.threadsClx.createThread(title)

            if (!insertRes.acknowledged) {
                throw new Error(
                    `Could not create thread: ${JSON.stringify(insertRes)}`,
                )
            }

            // fetch created thread
            const thread = await ctx.dataSources.threadsClx.getThread(
                insertRes.insertedId,
            )
            res.data = thread
            res.message = "Created thread " + title
        } catch (error) {
            res.message = getErrorMessage(error)
            res.success = false
        }
        return res
    },
}
