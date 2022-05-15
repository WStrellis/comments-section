import { MongoDataSource } from "apollo-datasource-mongodb"
import type { User } from "../../types"
import type { InsertOneResult } from "mongodb"

export default class UsersCollection extends MongoDataSource<User> {
    getUser(userId: string) {
        return this.findOneById(userId)
    }

    async getUsers(): Promise<User[] | null | undefined> {
        const res = await this.collection.find()
        return res.toArray()
    }

    addUser(name: string): Promise<InsertOneResult<User>> {
        return this.collection.insertOne({ name })
    }
}
