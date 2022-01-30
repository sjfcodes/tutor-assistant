const { makeExecutableSchema } = require('apollo-server-express');
const { merge } = require('lodash');
const { typeDefs: Tutor, resolvers: tutorResolvers } = require('./tutor');
const { typeDefs: Course, resolvers: courseResolvers } = require('./course');
const { typeDefs: Student, resolvers: studentResolvers } = require('./student');
const { typeDefs: Meeting, resolvers: meetingResolvers } = require('./meeting');
const { typeDefs: Calendly, resolvers: calendlyResolvers } = require('./calendly');
const { typeDefs: AccessToken, resolvers: accessTokenResolvers } = require('./accessToken');
const { typeDefs: EmailTemplate, resolvers: emailTemplateResolvers } = require('./emailTemplate');

const logger = { log: (e) => console.log(e) };

const schema = makeExecutableSchema({
  typeDefs: [
    Tutor,
    Course,
    Student,
    Meeting,
    Calendly,
    AccessToken,
    EmailTemplate,
  ],
  resolvers: merge(
    tutorResolvers,
    courseResolvers,
    studentResolvers,
    meetingResolvers,
    calendlyResolvers,
    accessTokenResolvers,
    emailTemplateResolvers,
  ),
  logger,
});

module.exports = schema;
