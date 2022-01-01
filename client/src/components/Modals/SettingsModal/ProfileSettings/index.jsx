import React, { useContext } from 'react';
import { Box } from 'react-bulma-components';
import { v4 as uuid } from 'uuid';
import ProfileListItem from './ProfileListItem';
import { AppContext } from '../../../../context';

const ProfileSettings = () => {
  const { tutorDetails } = useContext(AppContext);

  const renderDetails = [
    'firstName', 'lastName', 'calendlyLink', 'email',
    'githubUsername', 'timeZoneName',
  ];
  let count = 0;

  return (
    <Box className='border p-0'>
      <ul className='student-list rounded'>
        {Object.entries(tutorDetails).map(([property, value]) => {
          if (renderDetails.indexOf(property) === -1) return '';
          count += 1;
          return (
            <ProfileListItem
              key={uuid()}
              _id={tutorDetails._id}
              count={count}
              value={value}
              property={property}
            />
          );
        })}
      </ul>
    </Box>
  );
};

export default ProfileSettings;
