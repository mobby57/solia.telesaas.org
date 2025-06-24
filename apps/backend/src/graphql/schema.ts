import gql from 'graphql-tag';

export const schema = gql`
  type Query {
    hello: String
  }

  type Mutation {
    dummyMutation: String
  }
`;
