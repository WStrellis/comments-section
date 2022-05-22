import { MongoDataSource } from "apollo-datasource-mongodb"
import type { Thread, Comment } from "../../types"
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
    updateComments(threadId: string, comments: Comment[]): Promise<any> {
        return this.collection.updateOne(
            // @ts-expect-error
            { _id: new ObjectId(threadId) },
            { $set: { comments } },
        )
    }
}
