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
    meetingCount: Int
    meetings: [Meeting]
    name: String!
    studentCount: Int
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
