import { users, createThreads } from "./data.js"

export async function seedCollections(db) {
    const usersCollection = db.collection("users")

    // add Users
    const userResult = await usersCollection.insertMany(users)

    // get user ids
    const ids = userResult.insertedIds
    const leonard = ids["0"]
    const martha = ids["1"]
    console.log("userResult", ids)
    // const res = await usersCollection.find()
    // console.log(res)

    const threadsCollection = db.collection("threads")
    //make thread array
    const newThreads = createThreads(leonard, martha)
    // add threads
    const threadResult = await threadsCollection.insertMany(newThreads)
    console.log("threadResult", threadResult)

    return
}
