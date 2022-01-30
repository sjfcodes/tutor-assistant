const { gql } = require('apollo-server-express');
const { AccessToken } = require('../models');

const typeDefs = gql`

  type AccessToken {
    _id: ID!
    createdAt: String!
    token: String!
  }

  extend type Query {
    getAccessTokens: [AccessToken]
  }
`;

const resolvers = {
  Query: {
    getAccessTokens: async () => AccessToken.find({}),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
