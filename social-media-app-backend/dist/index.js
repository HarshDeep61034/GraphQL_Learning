"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const app = (0, express_1.default)();
const db_1 = require("./lib/db");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const gqlServer = new server_1.ApolloServer({
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
                    say: (_, name) => `Hello ${name}`,
                },
                Mutation: {
                    createUser: (_, { email, firstName, lastName, password, }) => __awaiter(this, void 0, void 0, function* () {
                        yield db_1.prismaClient.user.create({
                            data: {
                                email,
                                password,
                                firstName,
                                lastName,
                                salt: "H@rsh7017",
                            },
                        });
                        return true;
                    }),
                },
            },
        });
        yield gqlServer.start();
        app.use(express_1.default.json());
        app.use("/graphql", (0, express4_1.expressMiddleware)(gqlServer));
        app.listen(8000, () => {
            console.log("Server Listening at PORT 8000");
        });
    });
}
init();
