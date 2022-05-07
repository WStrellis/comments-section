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
  // create users collection with schema validation
  // https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/#std-label-jsonSchema-keywords
  const usersCollection = await  db.createCollection('users',{
    validator:{
      $jsonSchema: {
        bsonType: "object",
        required: ["name"],
        properties: {
          name: {
            bsonType: "string",
            minLength: 3,
            maxLength: 12,
            description: "username"
          }
        }
      }
    },
    validationAction: "error"
  });
  // enforce unique values for the "name" field
  usersCollection.createIndex({"name":1},{unique: true})
  // add Users
  const userResult = await usersCollection.insertMany(users)
  // get user ids
  const userIds = userResult.insertedIds
  console.log("userResult",userResult)

  console.log("userids",userIds)

  // create threads collection with schema validation


//   const threadsCollection = db.collection('threads');

//   return userResult
const findResult = await usersCollection.find()
await findResult.forEach(console.dir)
return

}

main()
  .catch(console.error)
  .finally(() => client.close());