import { MongoDataSource } from "apollo-datasource-mongodb"
import type { Thread } from "../../types"
import type { InsertOneResult } from "mongodb"

export default class ThreadsCollection extends MongoDataSource<Thread> {
    // getThread(threadId: string) {
    //     return this.findOneById(threadId)
    // }

    async getThreads(): Promise<Thread[] | null | undefined> {
        const res = await this.collection.find()
        return res.toArray()
    }

    // addUser(name: string): Promise<InsertOneResult<User>> {
    // return this.collection.insertOne({ name })
    // }
}
