"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mutations_1 = require("./mutations");
const queries_1 = require("./queries");
const resolvers_1 = require("./resolvers");
const typedefs_1 = require("./typedefs");
exports.User = { mutations: mutations_1.mutations, queries: queries_1.queries, resolvers: resolvers_1.resolvers, typedefs: typedefs_1.typedefs };
