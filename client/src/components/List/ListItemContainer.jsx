import { func, string } from 'prop-types';
import React from 'react';
import { Box, Level } from 'react-bulma-components';
import { LevelSide } from '../BulmaHelpers';
import DropDownIcon from '../DropDownIcon';

const ListItemContainer = ({
  // eslint-disable-next-line react/prop-types
  children, itemId, selectedItemId, toggleViewItem, listItemDetails,
}) => (
  <Box
    className={`border rounded px-0 py-0 mb-3
      ${selectedItemId !== itemId && 'hover-large-item'} `}
  >
    <Level
      renderAs='div'
      breakpoint='mobile'
      className={`py-1 ${selectedItemId === itemId && 'border-bottom pb-1 mb-0'}`}
      onClick={toggleViewItem}
    >
      <LevelSide>
        {children}
      </LevelSide>
      <Level.Side align='right'>
        <DropDownIcon active={(selectedItemId === itemId)} />
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
