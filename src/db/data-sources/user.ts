import { MongoDataSource } from 'apollo-datasource-mongodb'
import {ObjectId, FindCursor} from 'mongodb'
import type {User} from '../../types/index.d'


export default class UsersCollection extends MongoDataSource<User> {
  getUser(userId: string ) {
    return this.findOneById(userId)
  }

  getUsers(): Promise< User[] | null | undefined >{
    return this.collection.find()
  }
}