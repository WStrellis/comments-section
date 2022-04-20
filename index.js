import { join } from "path"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
//import { addResolversToSchema } from "@graphql-tools/schema"
import { createServer } from "@graphql-yoga/node"

import express from "express"

const schema = loadSchemaSync(join("graphql","schema.graphql"), {
    loaders: [new GraphQLFileLoader()],
})

// const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

const app = express()

const yoga = createServer({
    schema,
    // schema: schemaWithResolvers,
    graphiql: true,
})

app.use("/graphql", yoga)

const PORT = process.env.HTTP_PORT || 3000

app.listen(PORT, () => console.log("App listening on port", PORT))
