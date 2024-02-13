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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const db_1 = require("../../lib/db");
exports.resolvers = {
    queries: {
        hello: () => `Hello There from Graphql Server`,
        say: (_, name) => `Hello ${name}`,
    },
    mutations: {
        createUser: (_, { email, firstName, lastName, password, }) => __awaiter(void 0, void 0, void 0, function* () {
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
};
