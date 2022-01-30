const { gql } = require('apollo-server-express');
const { Student } = require('../models');

const typeDefs = gql`

  type Student {
    _id: ID!
    classId: String!
    createdAt: String
    email: String!
    firstName: String!
    fullTimeCourse: Boolean
    githubUsername: String
    graduationDate: String
    lastName: String!
    meetingLink: String
    meetingsPerWeek: Int
    notes: String
    reassignment:Boolean
    recurringMeeting: Boolean
    timeZoneName: String!
  }
  extend type Query {
    getStudents: [Student]
  }
`;

const resolvers = {
  Query: {
    getStudents: async () => Student.find({}),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
