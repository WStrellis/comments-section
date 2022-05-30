import { join } from "path"
import http from "http"

import express from "express"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"

import { getErrorMessage } from "./util/errors.js"

import Mutation from "./graphql/resolvers/mutations.js"
import Query from "./graphql/resolvers/queries.js"
import { GraphQLSchema, __InputValue } from "graphql"
import { loadSchemaSync } from "@graphql-tools/load"
import { mergeSchemas } from "@graphql-tools/schema"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import {
    ObjectIDTypeDefinition,
    ObjectIDResolver,
    DateTimeTypeDefinition,
    DateTimeResolver,
} from "graphql-scalars"

import { MongoClient, AuthMechanism } from "mongodb"

import type { Resolvers } from "./types/gql.js"
import UsersCollection from "./db/data-sources/usersCollection"
import ThreadsCollection from "./db/data-sources/threadsCollection"

import dotenv from "dotenv"

dotenv.config()

const PORT = Number(process.env.HTTP_PORT) || 3000
const MONGO_HOST = process.env.MONGO_HOST || "localhost"
const MONGO_PORT = process.env.MONGO_PORT || "27017"
const MONGO_USERNAME = process.env.MONGO_USERNAME || ""
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || ""

const mongoUri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/comments-section`


async function connectMongo(): Promise<MongoClient> {
    const mongoClient = new MongoClient(mongoUri, {
        auth: { username: MONGO_USERNAME, password: MONGO_PASSWORD },
        authMechanism: AuthMechanism.MONGODB_SCRAM_SHA256,
    })

    return mongoClient.connect()
}

async function startApollo(
    typeDefs: GraphQLSchema,
    resolvers: Resolvers,
    mongo: MongoClient,
): Promise<void> {
    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        dataSources: () => ({
            usersClx: new UsersCollection(mongo.db().collection("users")),
            threadsClx: new ThreadsCollection(mongo.db().collection("threads")),
        }),
    })

    app.use("/app",express.static("client"))

    await server.start()
    server.applyMiddleware({ app })
    httpServer.listen(PORT, () => console.log("App listening on port", PORT))
}

async function main(): Promise<void> {
    try {
        // Create schema
        const baseSchema = loadSchemaSync(
            join("src", "graphql", "schema.graphql"),
            {
                loaders: [new GraphQLFileLoader()],
            },
        )

        const mergedSchema = mergeSchemas({
            schemas: [baseSchema],
            typeDefs: [ObjectIDTypeDefinition, DateTimeTypeDefinition],
        })

        // add resolvers
        const resolvers: Resolvers = {
            Mutation,
            Query,
            ObjectID: ObjectIDResolver,
            DateTime: DateTimeResolver,
        }

        // connect to db
        const mongoClient = await connectMongo()

        // start server
        startApollo(mergedSchema, resolvers, mongoClient)
    } catch (error: unknown) {
        console.error(getErrorMessage(error))
    }
}

main()
