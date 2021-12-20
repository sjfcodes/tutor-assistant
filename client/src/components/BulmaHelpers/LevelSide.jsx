import React from 'react';
import { object } from 'prop-types';
import { Level } from 'react-bulma-components';

const LevelSide = ({ children }) => (
  <Level.Side>
    <Level.Item>
      {children}
    </Level.Item>
  </Level.Side>
);
export default LevelSide;
// eslint-disable-next-line react/forbid-prop-types
LevelSide.propTypes = { children: object.isRequired };
