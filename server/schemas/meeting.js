const { gql } = require('apollo-server-express');
const { Meeting } = require('../models');

const typeDefs = gql`

  type Meeting {
    _id: ID!
    createdAt:String
    duration: Int!
    endTime: String
    notes: String
    startTime: String!
    status: String!
    studentId: String!
  }

  extend type Query {
    getMeetings: [Meeting]
  }
`;

const resolvers = {
  Query: {
    getMeetings: async () => Meeting.find({}),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
