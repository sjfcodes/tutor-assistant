const { gql } = require('apollo-server-express');
const { EmailTemplate } = require('../models');

const typeDefs = gql`

  type EmailTemplateBody {
    html: String!
    text: String!
  }

  type EmailTemplateProperties {
    tutor: Boolean
    student: Boolean
    meeting: Boolean
  }

  type EmailTemplate {
    _id: ID!
    authorId: Tutor!
    body: EmailTemplateBody
    createdAt: String
    includePropertiesFor: EmailTemplateProperties
    name: String!
    subject: String!
  }

  extend type Query {
    getEmailTemplates: [EmailTemplate]
  }
`;

const resolvers = {
  Query: {
    getEmailTemplates: async () => EmailTemplate.find({}),
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
