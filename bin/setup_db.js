import { MongoClient } from "mongodb"
import dotenv from "dotenv"

import { cleanDB } from "./clean_db.js"
import { createUsers } from "./seed_db.js"

dotenv.config()

const username = process.env.MONGO_INITDB_ROOT_USERNAME
const password = process.env.MONGO_INITDB_ROOT_PASSWORD
const mongoHost = process.env.MONGO_HOST || "localhost"

const commands = ["clean", "seed"]

// Connection URL
const url = `mongodb://${username}:${password}@${mongoHost}:27017/?authMechanism=DEFAULT`

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

    // create database
    const db = client.db(dbName)

    switch (command) {
        // clean
        case commands[0]:
            await cleanDB(db)
            break

        // seed
        case commands[1]:
            await createUsers(db)
            break

        default:
            break
    }

    return
}

main()
    .catch(console.error)
    .finally(() => client.close())
