import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Columns, Icon } from 'react-bulma-components';
import { AppContext } from '../../context';

const EmailManager = () => {
  const { tutorDetails: { githubUsername } } = useContext(AppContext);
  return (
    <Box className='pt-0'>

      <Link to={`/${githubUsername}`} className='mt-0 pl-0'>
        <Icon className='fas fa-chevron-left is-small' />
        back
      </Link>

      <Columns>
        <Columns.Column>
          <h1>Email Manager</h1>
        </Columns.Column>
        <Columns.Column>
          <h1>Email Manager</h1>
        </Columns.Column>
        <Columns.Column>
          <h1>Email Manager</h1>
        </Columns.Column>
      </Columns>
    </Box>
  );
};
export default EmailManager;
