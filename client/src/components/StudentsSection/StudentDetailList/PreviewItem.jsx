import {
  bool, number, oneOfType, string,
} from 'prop-types';
import React from 'react';
import { Level } from 'react-bulma-components';
import CopyToClipboardIcon from '../../CopyToClipboardIcon';
import { getElementFor } from '../../Forms/ListItem';

const PreviewItem = ({ property, value }) => (
  <>
    <p className='ml-3'>
      {property}
      :
      {' '}
    </p>
    <Level
      className='ml-5'
      breakpoint='mobile'
    >
      <Level.Side style={{ width: '90%' }}>
        {getElementFor({ property, value })}
      </Level.Side>
      <Level.Side>
        <CopyToClipboardIcon data={value} />
      </Level.Side>
    </Level>
  </>
);

PreviewItem.propTypes = {
  property: string.isRequired,
  value: oneOfType([string, number, bool]).isRequired,
};

export default PreviewItem;
