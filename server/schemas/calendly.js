const { gql } = require('apollo-server-express');
const { Calendly } = require('../models');

const typeDefs = gql`

  type Calendly {
    _id: ID!
    avatar_url:  String
    created_at:  String
    current_organization:  String
    email:  String
    name:  String
    scheduling_url:  String
    slug:  String
    timezone:  String
    updated_at:  String
    uri:  String
  }

  extend type Query {
    getCalendlys: [Calendly]
  }
`;

const resolvers = {
  Query: {
    getCalendlys: async () => Calendly.find({}),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
