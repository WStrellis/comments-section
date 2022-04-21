import { join } from "path"
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
//import { addResolversToSchema } from "@graphql-tools/schema"
import express from "express"
import resolvers from './graphql/resolvers.js'


const schema = loadSchemaSync(join("graphql","schema.graphql"), {
    loaders: [new GraphQLFileLoader()],
})

// const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

const PORT = process.env.HTTP_PORT || 3000

async function startApollo(typeDefs,resolvers){
    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer})]
    })
    await server.start()
    server.applyMiddleware({app})
    httpServer.listen(PORT, () => console.log("App listening on port", PORT))
}

startApollo(schema,resolvers)




