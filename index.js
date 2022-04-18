import { join } from "path"
import { loadSchemaSync } from "@graphql-tools/load"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { addResolversToSchema } from "@graphql-tools/schema"
import { createServer } from "@graphql-yoga/node"
import resolvers from "./graphql/resolvers"

import * as express from "express"

const schema = loadSchemaSync(join(__dirname, "./graphql/schema.graphql"), {
    loaders: [new GraphQLFileLoader()],
})

const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

const app = express()

const yoga = createServer({
    schema: schemaWithResolvers,
    graphiql: true,
})

app.use("/graphql", yoga)

const PORT = process.env.HTTP_PORT || 3000

app.listen(PORT, () => console.log("App listening on port", PORT))
