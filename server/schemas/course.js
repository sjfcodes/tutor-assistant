const { gql } = require('apollo-server-express');
const { Course } = require('../models');

const typeDefs = gql`

  type CalendlyToken {
    accessToken: ID
    data: Calendly
  }

  type Course {
    _id: ID!
    calendly: CalendlyToken
    createdAt: String!
    meetings: [Meeting]
    name: String!
    students: [Student]
  }

  extend type Query {
    getCourses: [Course]
  }
`;

const resolvers = {
  Query: {
    getCourses: async () => Course.find({}),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
