import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {
  string, number, bool, shape,
} from 'prop-types';
import { Button, Level } from 'react-bulma-components';
import StudentListItem from './StudentListItem';
import { LevelSide } from '../BulmaHelpers';

const StudentList = ({ _id, student }) => {
  let count = 0;
  return (
    <>
      <Level
        renderAs='div'
        className='is-mobile p-2 border-bottom mb-0'
      >
        <LevelSide>
          {/* <Link to='/history'>
              <Button
                size='small'
                color='primary'
              >
                meeting history
              </Button>
            </Link> */}

        </LevelSide>
        <LevelSide>
          <Link to='/email'>
            <Button
              size='small'
              color='primary'
            >
              send email
            </Button>
          </Link>
        </LevelSide>
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
    graduationDate: string.isRequired,
    fullTimeCourse: bool.isRequired,
    githubUsername: string.isRequired,
    meetingLink: string.isRequired,
    meetingsPerWeek: number.isRequired,
    reassignment: bool.isRequired,
    recurringMeeting: bool.isRequired,
    createdAt: string.isRequired,
  }).isRequired,
};
