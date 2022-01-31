import { gql } from '@apollo/client';

// export const CREATE_TUTOR = gql`
//   query createTutor {
//   }
// `;

// eslint-disable-next-line import/prefer-default-export
export const MUTATION_LOGIN_TUTOR = gql`
  mutation loginTutor($email: String!, $password: String!) {
    loginTutor(email: $email, password: $password) {
      token
      tutor{
        _id
        courses {
          _id
          name
          createdAt
          calendly {
            accessToken
            data {
              _id
              avatar_url
              created_at
              current_organization
              email
              name
              scheduling_url
              slug
              timezone
              updated_at
              uri
            }
          }
          meetingCount
          meetings {
            _id
            createdAt
            duration
            endTime
            notes
            startTime
            status
            studentId
          }
          studentCount
          students {
            _id
            classId
            createdAt
            email
            firstName
            fullTimeCourse
            githubUsername
            graduationDate
            lastName
            meetingLink
            meetingsPerWeek
            notes
            reassignment
            recurringMeeting
            timeZoneName
          }
        }
        createdAt
        email
        firstName
        githubUsername
        lastName
        scheduleLink
        sendGrid {
          accessToken
        }
        timeZoneName
      }
    }
  }
`;
