import { func, string } from 'prop-types';
import React from 'react';
import { Box, Icon, Level } from 'react-bulma-components';
import { LevelSide } from '../BulmaHelpers';

const ListItemContainer = ({
  // eslint-disable-next-line react/prop-types
  itemId, selectedItemId, toggleViewItem, listItem, listItemDetails,
}) => (
  <Box
    className={`border rounded px-0 py-1 mb-3
      ${selectedItemId !== itemId && 'hover-large-item'}`}
  >
    <Level
      renderAs='div'
      breakpoint='mobile'
      className={`${selectedItemId === itemId && 'border-bottom pb-1 mb-0'}`}
      onClick={toggleViewItem}
    >
      <LevelSide>
        {listItem}
      </LevelSide>
      <Level.Side>
        <Icon className='mr-2'>
          <i className={`fas fa-chevron-${selectedItemId === itemId ? 'up' : 'down'}`} />
        </Icon>
      </Level.Side>
    </Level>
    {selectedItemId === itemId ? listItemDetails : null}
  </Box>

);

export default ListItemContainer;
ListItemContainer.propTypes = {
  itemId: string.isRequired,
  selectedItemId: string.isRequired,
  toggleViewItem: func.isRequired,
};
