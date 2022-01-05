import { func, string } from 'prop-types';
import React from 'react';
import {
  Box, Heading, Icon, Level,
} from 'react-bulma-components';
import { LevelSide } from '../BulmaHelpers';

const SectionContainer = ({
  // eslint-disable-next-line react/prop-types
  children, sectionName, addListItemClick,
}) => (
  <Box className='has-background-white py-1 px-3 mb-3'>
    <Level renderAs='div' className='is-mobile mt-2'>
      <LevelSide>
        <Heading size={4} className='mr-5'>{sectionName}</Heading>
      </LevelSide>
      <LevelSide>
        <Icon
          className='p-4 mr-1 hover'
          color='primary'
          onClick={addListItemClick}
        >
          <i className='fas fa-plus' />
        </Icon>
      </LevelSide>
    </Level>

    {children}

  </Box>

);
export default SectionContainer;

SectionContainer.propTypes = {
  sectionName: string.isRequired,
  addListItemClick: func.isRequired,
};
