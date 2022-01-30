const { gql } = require('apollo-server-express');
const { Tutor } = require('../models');

const typeDefs = gql`
  schema {
    query: Query
  }

  type sendGridAccessToken {
    accessToken: ID
  }

  type Tutor {
    _id: ID!
    courses: [Course]
    createdAt: String
    email: String!
    firstName: String!
    githubUsername: String
    lastName: String!
    password: String!
    scheduleLink: String
    sendGrid: sendGridAccessToken
    timeZoneName: String!
  }

  type Query {
    getTutors: [Tutor]
  }
`;

const resolvers = {
  Query: {
    getTutors: async () => Tutor.find({}).populate('courses'),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
