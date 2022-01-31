const { gql, ApolloError, AuthenticationError } = require('apollo-server-express');
const { Tutor } = require('../models');
const { getTutorByEmail, getTutorById } = require('../utils/helpers');
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
    loginWithToken:Auth
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
        return {
          tutor,
          token: signToken({
            email,
            _id: tutor._id,
            accountKey: encryptToken(password, process.env.JWT_SECRET),
          }),
        };
      } catch ({ message }) {
        reportError(message);
        throw new AuthenticationError('You need to be logged in!');
      }
    },
    loginWithToken: async (parent, args, context) => {
      try {
        const { tutor: { _id, email, accountKey } } = context;
        return {
          tutor: await getTutorById(_id),
          token: signToken({ _id, email, accountKey }),
        };
      } catch (error) {
        throw new AuthenticationError('You need to be logged in!');
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
