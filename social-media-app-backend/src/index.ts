import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
const app = express();
import bodyParser from "body-parser";

async function init() {
  const gqlServer = new ApolloServer({
    typeDefs: ``,
    resolvers: {},
  });

  await gqlServer.start();
  app.use(bodyParser);
  app.use("/graphql", expressMiddleware(gqlServer));
  app.listen(8000, () => {
    console.log("Server Listening at PORT 8000");
  });
}
