import React, {
  useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import ProfileDetailListItem from './ProfileDetailListItem';

const ProfileDetailList = () => {
  const tutorDetails = useSelector((state) => state.tutor);

  const [listItems, setListItems] = useState();
  const doNotDisplay = useMemo(() => [
    '_id',
    'id',
    '__v',
    'courses',
    'createdAt',
    'emailTemplates',
    'loggedIn',
    'password',
    'sendGrid',
  ], []);

  useEffect(() => {
    if (tutorDetails._id) setListItems(Object.entries(tutorDetails)
      .map(([property, value]) => {
        if (doNotDisplay.indexOf(property) !== -1) return null;
        return (
          <ProfileDetailListItem
            key={uuid()}
            _id={tutorDetails._id}
            value={value}
            property={property}
          />
        );
      }));
  }, [tutorDetails, doNotDisplay]);

  return (
    <ul className='rounded'>
      {listItems}
    </ul>
  );
};

export default ProfileDetailList;
