import React from 'react';
import { v4 as uuid } from 'uuid';
import { shape, string } from 'prop-types';
import MeetingListItem from './MeetingListItem';

const MeetingList = ({ _id, meeting }) => {
  let count = 0;
  const doNotDisplay = ['_id', '__v', 'tutorId', 'createdAt', 'studentId'];
  return (
    <ul className='student-list'>
      {
        Object
          .entries(meeting)
          .map(([property, value]) => {
            if (doNotDisplay.indexOf(property) !== -1) return null;
            count += 1;
            return (
              <MeetingListItem
                key={uuid()}
                _id={_id}
                // count is used for striped background
                count={count}
                value={value}
                property={property}
              />
            );
          })
      }
    </ul>

  );
};

export default MeetingList;

MeetingList.propTypes = {
  _id: string.isRequired,
  meeting: shape({
    _id: string.isRequired,
    endTime: string.isRequired,
    startTime: string.isRequired,
    status: string.isRequired,
    createdAt: string.isRequired,
  }).isRequired,
};
