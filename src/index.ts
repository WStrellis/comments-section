import { join } from "path"
import http from "http"

import express from "express"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"

import { getErrorMessage } from "./util/errors.js"

import Mutation from "./graphql/resolvers/mutations.js"
import Query from "./graphql/resolvers/queries.js"
import { GraphQLSchema } from "graphql"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"

import { MongoClient, AuthMechanism } from "mongodb"

import type { Resolvers } from "./types/index"
import UsersCollection from "./db/data-sources/usersCollection"

import dotenv from "dotenv"

dotenv.config()

const PORT = Number(process.env.HTTP_PORT) || 3000
const MONGO_HOST = process.env.MONGO_HOST || "localhost"
const MONGO_PORT = process.env.MONGO_PORT || "27017"
const MONGO_USERNAME = process.env.MONGO_USERNAME || ""
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ""

const mongoUri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/comments-section`

const schema = loadSchemaSync(join("src", "graphql", "schema.graphql"), {
    loaders: [new GraphQLFileLoader()],
})

const resolvers: Resolvers = {
    Mutation,
    Query,
}

async function connectMongo(): Promise<MongoClient> {
    const mongoClient = new MongoClient(mongoUri, {
        auth: { username: MONGO_USERNAME, password: MONGO_PASSWORD },
        authMechanism: AuthMechanism.MONGODB_SCRAM_SHA256,
    })

    return mongoClient.connect()
}

// TODO: set correct parameter types
async function startApollo(
    typeDefs: GraphQLSchema,
    resolvers: any,
    mongo: MongoClient,
): Promise<void> {
    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        dataSources: () => ({
            usersColl: new UsersCollection(mongo.db().collection("users")),
        }),
    })
    await server.start()
    server.applyMiddleware({ app })
    httpServer.listen(PORT, () => console.log("App listening on port", PORT))
}

async function main(
    resolvers: Resolvers,
    schema: GraphQLSchema,
): Promise<void> {
    try {
        const mongoClient = await connectMongo()
        startApollo(schema, resolvers, mongoClient)
    } catch (error: unknown) {
        console.error(getErrorMessage(error))
    }
}

main(resolvers, schema)
