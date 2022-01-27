import { func, string } from 'prop-types';
import React from 'react';
import {
  Box, Button, Heading, Icon, Level,
} from 'react-bulma-components';
import { LevelSide } from '../BulmaHelpers';
import DropDownIcon from '../DropDownIcon';

const SectionContainer = ({
  // eslint-disable-next-line react/prop-types
  children, sectionName, addListItemClick, active, handleActivate,
}) => (
  <Box className={`has-background-white py-1 px-3 mb-3 ${active ? 'border-primary' : ''}`}>
    <Level renderAs='div' className='is-mobile my-2'>
      <LevelSide>
        <Heading size={4} className='mr-3'>{sectionName}</Heading>
      </LevelSide>
      <LevelSide>
        <Button
          color='primary mr-5'
          className='tag'
          onClick={addListItemClick}
        >
          <Icon>
            <i className='fas fa-plus' />
          </Icon>
        </Button>
        <DropDownIcon
          onClick={handleActivate}
          active={active}
        />
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
