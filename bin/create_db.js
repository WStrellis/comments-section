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
    console.log("created collection 'users'")
    return
}

export async function createThreadsCollection(db) {
    const threadsCollection = await db.createCollection("threads", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["title", "comments"],
                properties: {
                    _id: {},
                    title: {
                        bsonType: "string",
                        minLength: 3,
                        maxLength: 30,
                        description: "title of the thread",
                    },
                    comments: {
                        bsonType: ["array"],
                        additionalProperties: false,
                        items: {
                            bsonType: ["object"],
                            additionalProperties: false,
                            required: ["user", "text", "timestamp", "replies"],
                            properties: {
                                user: {
                                    bsonType: "objectId",
                                    description: "user that posted comment",
                                },
                                text: {
                                    bsonType: "string",
                                },
                                timestamp: {
                                    bsonType: "date",
                                },
                                replies: {
                                    bsonType: ["array"],
                                    additionalProperties: false,
                                    items: {
                                        bsonType: ["object"],
                                        additionalProperties: false,
                                        required: ["user", "text", "timestamp"],
                                        properties: {
                                            user: {
                                                bsonType: "objectId",
                                                description:
                                                    "user that posted reply",
                                            },
                                            text: {
                                                bsonType: "string",
                                            },
                                            timestamp: {
                                                bsonType: "date",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        validationAction: "error",
    })

    threadsCollection.createIndex({ title: 1 }, { unique: true })
    console.log("created collection 'threads'")

    return
}
