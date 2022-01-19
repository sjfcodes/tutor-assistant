import React from 'react';
// import { object, oneOfType, string } from 'prop-types';
import { Level } from 'react-bulma-components';

// eslint-disable-next-line react/prop-types
const LevelSide = ({ children }) => (
  <Level.Side>
    <Level.Item>
      {children}
    </Level.Item>
  </Level.Side>
);
export default LevelSide;
// eslint-disable-next-line react/forbid-prop-types
// LevelSide.propTypes = { children: oneOfType([string, object]) };
// LevelSide.defaultProps = { children: ' ' };
