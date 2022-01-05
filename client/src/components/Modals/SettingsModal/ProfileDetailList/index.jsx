import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { v4 as uuid } from 'uuid';

import { Box } from 'react-bulma-components';
import ProfileDetailListItem from './ProfileDetailListItem';
import { AppContext } from '../../../../context';

const ProfileDetailList = () => {
  const { tutorDetails } = useContext(AppContext);

  const [listItems, setListItems] = useState();
  const doNotDisplay = useMemo(() => [
    '_id',
    '__v',
    'createdAt',
    'loggedIn',
    'emailTemplates',
    'courses',
    'password',
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
    <Box className='border p-0'>
      <ul className='rounded'>
        {listItems}
      </ul>
    </Box>
  );
};

export default ProfileDetailList;
