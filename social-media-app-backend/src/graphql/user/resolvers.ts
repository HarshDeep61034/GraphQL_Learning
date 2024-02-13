import { prismaClient } from "../../lib/db";
export const resolvers = {
  queries: {
    hello: () => `Hello There from Graphql Server`,
    say: (_: any, name: String) => `Hello ${name}`,
  },

  mutations: {
    createUser: async (
      _: any,
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
};
