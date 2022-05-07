import {users,threads} from './data.js'

export async function createUsers(db){
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

    //   return userResult
    const findResult = await usersCollection.find()
    await findResult.forEach(console.dir)
    return
}