import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {
  string, number, bool, shape,
} from 'prop-types';
import { Button, Level } from 'react-bulma-components';
import StudentListItem from './StudentListItem';

const StudentList = ({ _id, student }) => {
  let count = 0;
  return (
    <>
      <Level
        renderAs='div'
        className='is-mobile mx-3 my-2 py-3'
      >
        <Level.Side>
          <Level.Item>
            <Button
              size='small'
              className='is-link is-light is-outlined'
            >
              <Link to='/history'>
                meeting history
              </Link>
            </Button>
          </Level.Item>

        </Level.Side>
        <Level.Side>
          <Level.Item>
            <Button
              size='small'
              className='button is-link is-light is-outlined'
            >
              <Link to='/email'>
                send email
              </Link>
            </Button>
          </Level.Item>
        </Level.Side>
      </Level>
      <ul className='student-list'>
        {Object.entries(student).map(([property, value]) => {
          const doNotDisplay = ['_id', 'createdAt', '__v'];
          if (doNotDisplay.indexOf(property) !== -1) return null;
          count += 1;
          return (
            <StudentListItem
              key={uuid()}
              value={value}
              _id={_id}
              count={count}
              property={property}
            />
          );
        })}
      </ul>
    </>
  );
};

export default StudentList;

StudentList.propTypes = {
  _id: string.isRequired,
  student: shape({
    firstName: string.isRequired,
    lastName: string.isRequired,
    email: string.isRequired,
    classId: string.isRequired,
    timeZoneOffset: string.isRequired,
    graduationDate: number.isRequired,
    fullTimeCourse: bool.isRequired,
    githubUsername: string.isRequired,
    meetingLink: string.isRequired,
    meetingsPerWeek: number.isRequired,
    reassignment: bool.isRequired,
    recurringMeeting: bool.isRequired,
    createdAt: number.isRequired,
  }).isRequired,
};
