import { MongoDataSource } from "apollo-datasource-mongodb"
import type { Thread, Comment, Reply } from "../../types/gql.js"
import { ObjectId } from "mongodb"

export default class ThreadsCollection extends MongoDataSource<Thread> {
    getThread(threadId: string) {
        return this.findOneById(new ObjectId(threadId))
    }

    async getThreads(): Promise<Thread[] | null | undefined> {
        const res = await this.collection.find()
        return res.toArray()
    }

    createThread(title: string) {
        return this.collection.insertOne({
            title,
            created: new Date().toISOString(),
            comments: [],
        })
    }
    updateComments(threadId: string, comments: Comment[]) {
        return this.collection.updateOne(
            // @ts-expect-error
            { _id: new ObjectId(threadId) },
            { $set: { comments } },
        )
    }

    addReply(threadId: string, commentIdx: number, reply: Reply) {
        return this.collection.updateOne(
            // @ts-expect-error
            { _id: new ObjectId(threadId) },
            { $push: { ["comments." + commentIdx + ".replies"]: reply } },
        )
    }
}
