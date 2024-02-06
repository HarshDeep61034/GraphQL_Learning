const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const axios = require("axios");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
      type Todo {
        id: ID!
        userId: ID!
        title: String!
        completed: Boolean
        user: User
      }
      
     type User{
      id: ID!
      name: String
      email: String!
      username: String!
}

      type Query {
        getTodos: [Todo]
        getUsers: [User]
        getUser(id: ID!): User 
}
    `,
    resolvers: {
      Todo: {
        user: async (todo) =>
          (
            await axios.get(
              `https://jsonplaceholder.typicode.com/users/${todo.userId}`,
            )
          ).data,
      },

      Query: {
        getTodos: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/todos/")).data,
        getUsers: async () =>
          (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
        getUser: async (_parent, { id }) =>
          (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
            .data,
      },
    },
  });

  app.use(bodyParser.json());
  app.use(cors()); // Enable CORS

  await server.start();

  app.use("/graphql", expressMiddleware(server));
  app.listen(8000, () => console.log("Server started at PORT 8000"));
}

startServer();
