import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { shape, string } from 'prop-types';
import MeetingDetailListItem from './MeetingDetailListItem';

const MeetingDetailList = ({ _id, meeting }) => {
  const [listItems, setListItems] = useState();
  const doNotDisplay = useMemo(
    () => ['_id', '__v', 'tutorId', 'createdAt', 'studentId', 'type'],
    [],
  );

  useEffect(() => {
    let count = 0;
    if (_id && meeting) setListItems(
      Object.entries(meeting)
        .map(([property, value]) => {
          if (doNotDisplay.indexOf(property) !== -1) return null;
          count += 1;
          return (
            <MeetingDetailListItem
              key={uuid()}
              _id={_id}
              count={count} // used for striped background
              value={value}
              property={property}
              type={meeting.type}
            />
          );
        }),
    );
  }, [_id, meeting, doNotDisplay]);

  return (
    <ul className='rounded'>
      {listItems}
    </ul>
  );
};

export default MeetingDetailList;

MeetingDetailList.propTypes = {
  _id: string.isRequired,
  meeting: shape({
    _id: string.isRequired,
    endTime: string.isRequired,
    startTime: string.isRequired,
    status: string.isRequired,
    createdAt: string.isRequired,
  }).isRequired,
};
