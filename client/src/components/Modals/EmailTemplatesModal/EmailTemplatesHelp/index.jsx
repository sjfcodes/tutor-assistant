import React, { useContext } from 'react';
import { Box, Content, Heading } from 'react-bulma-components';
import { v4 as uuidv4 } from 'uuid';
import { EmailTemplatesContext } from '../EmailTemplatesProvider';
import ToggleHelpButton from './ToggleHelpButton';

// eslint-disable-next-line react/prop-types
const Blockquote = ({ children }) => (
  <blockquote className='is-size-7 rounded border mb-3 p-1 '>
    {children}
  </blockquote>
);
// eslint-disable-next-line react/prop-types
const Descriptionlist = ({ children }) => (
  <dl className='my-0'>
    {children}
  </dl>
);
// eslint-disable-next-line react/prop-types
const DescriptionTerm = ({ children }) => (
  <dt className='ml-1'>
    <strong>{children}</strong>
  </dt>
);
// eslint-disable-next-line react/prop-types
const DescriptionDetail = ({ children }) => (
  <dd className='mb-3 ml-3'>
    {children}
  </dd>
);

const tableData = [
  {
    title: 'Tutor & Student (both)',
    items: {
      firstName: 'persons first name',
      lastName: 'persons last name',
      email: 'persons email',
      githubUsername: 'persons GitHub username',
    },
  }, {
    title: 'Tutor (only)',
    items: {
      scheduleLink: 'link to scheduling platform',
    },
  }, {
    title: 'Student (only)',
    items: {
      meetingLink: 'students designated meeting location ie: zoomLink',
    },
  }, {
    title: 'Meeting (only)',
    items: {
      startTime: 'meeting start date & time',
      duration: 'meeting duration in hours',
    },
  },
];
const getItemDescriptions = (items) => (
  Object
    .entries(items)
    .map(([property, description]) => (
      <div key={uuidv4()}>
        <DescriptionTerm><strong>{property}</strong></DescriptionTerm>
        <DescriptionDetail>{description}</DescriptionDetail>
      </div>
    ))
);
const buildHelpTables = () => tableData.map(({ title, items }) => (
  <div key={uuidv4()}>
    <h6 className='mb-0'>{title}</h6>
    <Blockquote>
      <Descriptionlist>
        {' '}
        {getItemDescriptions(items)}
      </Descriptionlist>
    </Blockquote>
  </div>

));

const EmailTemplatesHelp = () => {
  const { viewHelp } = useContext(EmailTemplatesContext);
  if (!viewHelp) return '';

  return (
    <Box className='border-info'>
      <Heading>How this Works</Heading>
      <Content>
        <p className='mb-0'>A tutor often sends the same emails to students for different tasks.</p>
        <Blockquote>
          <ul className='my-0'>
            <li>welcoming new students</li>
            <li>scheduling or confirming meetings</li>
            <li>session review requests</li>
            <li>notices of any changes</li>
          </ul>
        </Blockquote>
        <br />
        <p className='mb-0'>Tutorly can help automate this process in 3 steps.</p>
        <Blockquote>
          <ol className='my-0'>
            <li>select a student or meeting</li>
            <li>select an email template</li>
            <li>click send!</li>
          </ol>
        </Blockquote>
        <p>{'Tutorly can use data you\'ve already provided to autofill your templates.'}</p>
        <hr />
        <h4>Available dataPoints</h4>
        {buildHelpTables()}
        <hr />
        <p className='mb-0'>{'Any dataPoint can be used in a template\'s subject line or body with the following format:'}</p>
        <Blockquote>
          <Descriptionlist>
            <DescriptionTerm>[student-dataPoint]</DescriptionTerm>
            <DescriptionDetail>Hello [student-firstName],</DescriptionDetail>
            <DescriptionTerm>[tutor-dataPoint]</DescriptionTerm>
            <DescriptionDetail>My name is [tutor-firstName].</DescriptionDetail>
            <DescriptionTerm>[meeting-dataPoint]</DescriptionTerm>
            <DescriptionDetail>Confirming our meeting on [meeting-startTime].</DescriptionDetail>
          </Descriptionlist>
        </Blockquote>
        <hr />
      </Content>
      <ToggleHelpButton />
    </Box>
  );
};
export default EmailTemplatesHelp;
