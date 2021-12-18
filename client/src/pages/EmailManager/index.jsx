import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Icon } from 'react-bulma-components';
import { AppContext } from '../../context';

const EmailManager = () => {
  const { tutorDetails: { githubUsername } } = useContext(AppContext);
  return (
    <Box className='pt-0'>

      <Link to={`/${githubUsername}`} className='mt-0 pl-0'>
        <Icon className='fas fa-chevron-left is-small' />
        home
      </Link>
      <Box>
        {/* <div class="is-flex is-align-items-center mb-2">
            <label class="label is-size-7 mb-0 mr-1" htmlFor=${name}">1. name it ➡️</label>
            <input type=text data-i="${i}" name="${name}"
             aria-label="name" value="${name}" id="template-for-${i}" >
        </div> */}
      </Box>
      <Box>
        <h1>Values</h1>
      </Box>
      <Box>
        <h1>Builder</h1>
      </Box>
      <Box>
        <h1>Preview</h1>
      </Box>

    </Box>
  );
};
export default EmailManager;
