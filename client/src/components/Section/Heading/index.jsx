import {
  number, oneOfType, string,
} from 'prop-types';
import React from 'react';
import { Heading } from 'react-bulma-components';

const SectionHeading = ({ sectionName, count }) => (
  <Heading
    size={4}
    className='mr-3'
  >
    {`${sectionName} [ ${count} ]`}
  </Heading>
);

export default SectionHeading;

SectionHeading.propTypes = {
  sectionName: string.isRequired,
  count: oneOfType([string, number]).isRequired,
};
