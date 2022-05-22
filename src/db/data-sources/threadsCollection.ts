import { MongoDataSource } from "apollo-datasource-mongodb"
import type { Thread } from "../../types"
import { ObjectId } from "mongodb"
import type { TimeLike } from "fs"

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
}
