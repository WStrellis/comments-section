import { join } from "path"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import http from "http"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import express from "express"

import Mutations from "./graphql/resolvers/mutations.js"
import Query from "./graphql/resolvers/queries.js"
import db from "./db/data.js"
import { GraphQLSchema } from "graphql"

const schema = loadSchemaSync(join("src", "graphql", "schema.graphql"), {
    loaders: [new GraphQLFileLoader()],
})

const PORT = Number(process.env.HTTP_PORT) || 3000

const resolvers : any = {
    Mutations,
    Query
}

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
        context: ({ req }) => ({
            ...req,
            db,
        }),
    })
    await server.start()
    server.applyMiddleware({ app })
    httpServer.listen(PORT, () => console.log("App listening on port", PORT))
}

startApollo(schema, resolvers)
