import { MongoDataSource } from "apollo-datasource-mongodb"
import type { Thread } from "../../types"
import type { ObjectId } from "mongodb"

export default class ThreadsCollection extends MongoDataSource<Thread> {
    getThread(threadId: ObjectId) {
        return this.findOneById(threadId)
    }

    async getThreads(): Promise<Thread[] | null | undefined> {
        const res = await this.collection.find()
        return res.toArray()
    }

    createThread(title: string) {
        return this.collection.insertOne({
            title,
            created: Date.now(),
            comments: [],
        })
    }
}
