import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
const app = express();
import bodyParser from "body-parser";
import { prismaClient } from "./lib/db";
async function init() {
  const gqlServer = new ApolloServer({
    typeDefs: `

    type Query {
    hello: String
    say(name: String): String 
     }
    
   type Mutation{
  createUser(email: String!, firstName: String!, lastName: String!, password: String!): Boolean
}

`,
    resolvers: {
      Query: {
        hello: () => `Hello There from Graphql Server`,
        say: (_, name: String) => `Hello ${name}`,
      },
      Mutation: {
        createUser: async (
          _,
          {
            email,
            firstName,
            lastName,
            password,
          }: {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          },
        ) => {
          await prismaClient.user.create({
            data: {
              email,
              password,
              firstName,
              lastName,
              salt: "H@rsh7017",
            },
          });
          return true;
        },
      },
    },
  });

  await gqlServer.start();
  app.use(express.json());
  app.use("/graphql", expressMiddleware(gqlServer));
  app.listen(8000, () => {
    console.log("Server Listening at PORT 8000");
  });
}

init();
