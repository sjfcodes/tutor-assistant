const { gql, ApolloError } = require('apollo-server-express');
const { Tutor } = require('../models');
const { getTutorByEmail } = require('../utils/helpers');
const { encryptToken } = require('../utils/encryption');
const { signToken } = require('../utils/auth');
// const { getCalendlyMeetings } = require('../utils/calendly-helpers');
const { reportError } = require('../utils/consoleColors/index.js');

const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
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

  type Auth {
    token: ID!
    tutor: Tutor
  }

  type Query {
    getTutors: [Tutor]
  }

  type Mutation {
    createTutor(
      email:String,
      firstName:String,
      githubUsername: String
      lastName: String!
      password: String!
      scheduleLink: String
      timeZoneName: String!
    ): String
    loginTutor(
      email:String!,
      password: String!
    ):Auth
  }
`;

const resolvers = {
  Query: {
    getTutors: async () => Tutor.find({}).populate('courses'),
  },
  Mutation: {
    // eslint-disable-next-line no-unused-vars
    createTutor: async (parent, args) => {

      // try {
      //   const tutor = await Tutor.create({
      //     ...body,
      //     email: body.email.toLowerCase(),
      //   });
      //   const { _id, password, email } = tutor;
      //   const accountKey = encryptToken(password, process.env.JWT_SECRET);
      //   const token = signToken({ _id, email, accountKey });

      //   tutor.password = null;
      //   return res.json({ token, tutor });
      // } catch ({ message }) {
      //   reportError(message);
      //   return res.status(500).json({ location: 1, message });
      // }
    },
    loginTutor: async (parent, { email, password }) => {
      try {
        const tutor = await getTutorByEmail(email);
        if (!tutor || !await tutor.isCorrectPassword(password)) return new ApolloError('unauthorized');

        // store encrypted password to access a users encrypted api keys
        const accountKey = encryptToken(password, process.env.JWT_SECRET);
        const { _id } = tutor;
        // const { _id, calendly } = tutor;

        const token = signToken({ _id, email, accountKey });

        // if (calendly?.uri) {
        //   const { uri } = calendly;
        //   const calendlyMeetings = await getCalendlyMeetings({ _id, accountKey, uri });
        //   return { token, tutor, calendlyMeetings };
        // }

        return { token, tutor };
      } catch ({ message }) {
        reportError(message);
        return new ApolloError({ code: 1, message });
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
