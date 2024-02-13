import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
const app = express();
import { createGqlServer } from "./graphql/index";

async function init() {
  app.use(express.json());
  app.use("/graphql", expressMiddleware(await createGqlServer()));
  app.listen(8000, () => {
    console.log("Server Listening at PORT 8000");
  });
}

init();
