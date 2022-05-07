import { users, threads } from "./data.js"

export async function seedCollections(db) {
    const usersCollection = db.collection("users")

    // add Users
    const userResult = await usersCollection.insertMany(users)

    // get user ids
    const userIds = userResult.insertedIds
    console.log("userResult", userResult)

    // add threads
    //   return userResult
    // const findResult = await db.users.find()
    // await findResult.forEach(console.dir)
    return
}

export async function createUsersCollection(db) {
    // create users collection with schema validation
    // https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/#std-label-jsonSchema-keywords
    const usersCollection = await db.createCollection("users", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name"],
                properties: {
                    name: {
                        bsonType: "string",
                        minLength: 3,
                        maxLength: 12,
                        description: "username",
                    },
                },
            },
        },
        validationAction: "error",
    })

    // enforce unique values for the "name" field
    usersCollection.createIndex({ name: 1 }, { unique: true })
    return
}

export async function createThreadsCollection(db) {
    const threadsCollection = await db.createCollection("threads", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["title"],
                properties: {
                    name: {
                        bsonType: "string",
                        minLength: 3,
                        maxLength: 30,
                        description: "title of the thread",
                    },
                },
            },
        },
        validationAction: "error",
    })

    usersCollection.createIndex({ title: 1 }, { unique: true })
}
