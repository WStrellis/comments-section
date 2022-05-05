import { join } from "path"
import http from "http"

import express from "express"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"

import Mutation from "./graphql/resolvers/mutations.js"
import Query from "./graphql/resolvers/queries.js"
import { GraphQLSchema } from "graphql"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"

import {MongoClient} from 'mongodb'

import type {Resolvers} from './types/index'

import dotenv from 'dotenv'

dotenv.config()

const schema = loadSchemaSync(join("src", "graphql", "schema.graphql"), {
    loaders: [new GraphQLFileLoader()],
})

const PORT = Number(process.env.HTTP_PORT) || 3000
const MONGO_HOST = process.env.MONGO_HOST || "localhost"
const MONGO_PORT = process.env.MONGO_PORT || "27017"

const resolvers : Resolvers = {
    Mutation,
    Query
}

const mongoUri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/comments-section`
const mongoClient = new MongoClient(mongoUri)
mongoClient.connect()

// TODO: set correct parameter types
async function startApollo(
    typeDefs: GraphQLSchema,
    resolvers: any,
): Promise<void> {
    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        dataSources: () => ({
            users: 
        })
        
    })
    await server.start()
    server.applyMiddleware({ app })
    httpServer.listen(PORT, () => console.log("App listening on port", PORT))
}

startApollo(schema, resolvers)
