import {
    type UserResponse,
    type ThreadResponse,
    type Comment,
    type Thread,
    type CommentResponse,
    type ReplyResponse,
    type Reply,
    ActionType,
} from "../../types/gql.js"

import { type InsertOneResult, UpdateResult, ObjectId } from "mongodb"
import { getErrorMessage } from "../../util/errors"

export default {
    addUser: async (
        _: any,
        { name }: { name: string },
        ctx: any,
    ): Promise<UserResponse> => {
        // add user
        const res: UserResponse = {
            action: ActionType.Create,
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
    ): Promise<ThreadResponse> => {
        const res: ThreadResponse = {
            action: ActionType.Create,
            success: true,
            message: "",
            data: undefined,
        }

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
    createComment: async (
        _: any,
        {
            threadId,
            user,
            text,
        }: { threadId: string; user: string; text: string },
        ctx: any,
    ): Promise<CommentResponse> => {
        const res: CommentResponse = {
            action: ActionType.Create,
            success: true,
            message: "",
            threadId,
            data: undefined,
        }

        try {
            // fetch thread
            const thread: Thread = await ctx.dataSources.threadsClx.getThread(
                threadId,
            )
            if (!thread) {
                throw new Error(
                    `Could not fetch thread data. DB reponse: ${JSON.stringify(
                        thread,
                    )}`,
                )
            }

            // create comment
            const comment: Comment = {
                // @ts-expect-error
                user: new ObjectId(user),
                text,
                timestamp: new Date().toISOString(),
                replies: [],
            }

            // append new comment
            const { comments } = thread
            comments.push(comment)

            // update thread
            const updateRes: UpdateResult =
                await ctx.dataSources.threadsClx.updateComments(
                    threadId,
                    comments,
                )
            console.log("updateRes", updateRes)

            if (!updateRes.acknowledged) {
                throw new Error(
                    `Could not create comment: ${JSON.stringify(updateRes)}`,
                )
            }

            res.data = comment
            res.message = "Created comment"
        } catch (error) {
            res.message = getErrorMessage(error)
            res.success = false
        }
        return res
    },
    createReply: async (
        _: any,
        {
            threadId,
            commentIdx,
            user,
            text,
        }: { threadId: string; commentIdx: number; user: string; text: string },
        ctx: any,
    ): Promise<ReplyResponse> => {
        const res: ReplyResponse = {
            action: ActionType.Create,
            success: true,
            message: "",
            threadId,
            commentIndex: commentIdx,
            data: undefined,
        }

        try {
            // create comment
            const reply: Reply = {
                // @ts-expect-error
                user: new ObjectId(user),
                text,
                timestamp: new Date().toISOString(),
            }

            // update thread
            const updateRes: UpdateResult =
                await ctx.dataSources.threadsClx.addReply(
                    threadId,
                    commentIdx,
                    reply,
                )

            if (!updateRes.acknowledged) {
                throw new Error(
                    `Could not create comment: ${JSON.stringify(updateRes)}`,
                )
            }

            res.data = reply
            res.message = "Created reply"
        } catch (error) {
            res.message = getErrorMessage(error)
            res.success = false
        }
        return res
    },
}
