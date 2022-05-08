import { users, createthreads } from "./data.js"

export async function seedCollections(db) {
    const usersCollection = db.collection("users")

    // add Users
    const userResult = await usersCollection.insertMany(users)

    // get user ids
    const ids = userResult.insertedIds
    const leonard = ids["0"]
    const martha = ids["1"]
    console.log("userResult", ids)

    const threadsCollection = db.collection("threads")
    //make thread array
    const newThreads = createthreads(leonard, martha)
    // add threads
    const threadResult = await threadsCollection.insertMany(newThreads)
    console.log("threadResult", threadResult)
    // const findResult = await db.users.find()
    // await findResult.forEach(console.dir)
    return
}
