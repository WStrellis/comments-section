import { join } from "path"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import http from "http"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import express from "express"

import resolvers from "./graphql/resolvers/index.js"
import db from "./db/data.js"
/*
const  {join}  = require( 'path')
const { ApolloServer } = require("apollo-server-express")
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import http from "http"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import express from "express"

import resolvers from "./graphql/resolvers/index.js"
import db from "./db/data.js"
*/

const schema = loadSchemaSync(join("src", "graphql", "schema.graphql"), {
    loaders: [new GraphQLFileLoader()],
})

// const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

const PORT = Number(process.env.HTTP_PORT) || 3000

// TODO: set correct parameter types
async function startApollo(typeDefs:any, resolvers:any) : Promise<void>{
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
