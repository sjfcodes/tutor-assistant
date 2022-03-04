import {
  number, oneOfType, string,
} from 'prop-types';
import React from 'react';
import { Heading } from 'react-bulma-components';
import './style.css';

const SectionHeading = ({ sectionName, count }) => (
  <div className='heading-wrapper'>
    <Heading size={4} className='mr-3'>
      {sectionName}
    </Heading>
    <Heading size={4} className='heading-count'>
      <span>[</span>
      {count}
      <span>]</span>
    </Heading>
  </div>
);

export default SectionHeading;

SectionHeading.propTypes = {
  sectionName: string.isRequired,
  count: oneOfType([string, number]).isRequired,
};
