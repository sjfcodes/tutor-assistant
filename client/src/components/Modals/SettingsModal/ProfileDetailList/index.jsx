import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { v4 as uuid } from 'uuid';

import ProfileDetailListItem from './ProfileDetailListItem';
import { AppContext } from '../../../../context';

const ProfileDetailList = () => {
  const { tutorDetails } = useContext(AppContext);

  const [listItems, setListItems] = useState();
  const doNotDisplay = useMemo(() => [
    '_id',
    '__v',
    'courses',
    'createdAt',
    'emailTemplates',
    'loggedIn',
    'password',
    'sendGrid',
  ], []);

  useEffect(() => {
    if (!tutorDetails._id) return '';

    setListItems(
      Object.entries(tutorDetails)
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
        }),
    );

    return '';
  }, [tutorDetails, doNotDisplay]);

  return (
    <ul className='rounded'>
      {listItems}
    </ul>
  );
};

export default ProfileDetailList;
