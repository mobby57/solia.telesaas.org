export const resolvers = {
  Query: {
    hello: async () => {
      return 'Hello from Solia GraphQL API!';
    },
  },
  Mutation: {
    dummyMutation: async () => {
      return 'Dummy mutation response';
    },
  },
};
