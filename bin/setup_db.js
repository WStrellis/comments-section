import { MongoClient } from "mongodb"
import dotenv from "dotenv"

import { cleanDB } from "./clean_db.js"
import { seedCollections } from "./seed_db.js"
import { createUsersCollection, createThreadsCollection } from "./create_db.js"
import { addUser } from "./add_user.js"

dotenv.config()

const rootUsername = process.env.MONGO_INITDB_ROOT_USERNAME
const rootPassword = process.env.MONGO_INITDB_ROOT_PASSWORD
const MONGO_USERNAME = process.env.MONGO_USERNAME || ""
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ""
const mongoHost = process.env.MONGO_HOST || "localhost"

const commands = ["clean", "seed", "create-db", "create-user"]

// Connection URL
const url = `mongodb://${rootUsername}:${rootPassword}@${mongoHost}:27017/?authMechanism=DEFAULT`

const client = new MongoClient(url)

// Database Name
const dbName = "comments-section"

async function main() {
    const command = process.argv[process.argv.length - 1]
    if (!commands.includes(command)) {
        throw new Error(`Missing required argument:  ${commands.join(" | ")}`)
    }
    // Use connect method to connect to the server
    await client.connect()
    console.log("Connected successfully to server")

    // will create db if not exists
    const db = client.db(dbName)

    try {
        switch (command) {
            // clean
            case commands[0]:
                await cleanDB(db)
                break

            // seed
            case commands[1]:
                await cleanDB(db)
                await createUsersCollection(db)
                await createThreadsCollection(db)
                await seedCollections(db)
                break

            // create-db
            case commands[2]:
                await cleanDB(db)
                await createUsersCollection(db)
                await createThreadsCollection(db)
                break

            // add-user
            case commands[3]:
                await addUser(db, MONGO_USERNAME, MONGO_PASSWORD)
                break

            default:
                break
        }
    } catch (error) {
        console.error(error.message)
    }
    return
}

main()
    .catch(console.error)
    .finally(() => client.close())
