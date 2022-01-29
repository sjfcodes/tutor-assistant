const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type AccessToken {
    _id: ID!
    createdAt: String!
    token: String!
  }

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

  type Meeting {
    _id: ID!
    createdAt:String
    duration: Int!
    endTime: String
    notes: String
    startTime: String!
    status: String!
    studentId: Student!
  }

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
    tutor: [Tutor]
  }

  # type Mutation {
   # createMatchup(tech1: String!, tech2: String!): Matchup
   # createVote(_id: String!, techNum: Int!): Matchup
  # }
`;

module.exports = typeDefs;
