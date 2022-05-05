import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import {users,threads} from './data.js'

dotenv.config()
const username= process.env.MONGO_INITDB_ROOT_USERNAME
const password= process.env.MONGO_INITDB_ROOT_PASSWORD

// Connection URL
const url = `mongodb://${username}:${password}@localhost:27017/?authMechanism=DEFAULT`;
const client = new MongoClient(url);

// Database Name
const dbName = 'comments-section';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const usersCollection = db.collection('users');
//   const threadsCollection = db.collection('threads');

//   const userResult = await usersCollection.insertMany(users)
//   return userResult
const findResult = await usersCollection.find()
await findResult.forEach(console.dir)
return

}

main()
  .catch(console.error)
  .finally(() => client.close());