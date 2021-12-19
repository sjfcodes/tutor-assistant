import React, { useState } from 'react';
import {
  Box, Columns, Content, Icon, Level,
} from 'react-bulma-components';

const HowItWorks = () => {
  const [viewHelp, setViewHelp] = useState(true);

  return (
    <Box className='mb-1 px-3 py-1'>
      <Level
        renderAs='div'
        className='is-mobile px-0 mb-0'
        onClick={() => setViewHelp((current) => !current)}
      >
        <Level.Side>
          <Level.Item className=''>
            <h1 className='is-size-5 has-text-weight-bold'>How it works</h1>
          </Level.Item>
        </Level.Side>

        <Level.Side>
          <Level.Item>
            <p>{viewHelp ? 'hide' : 'show'}</p>
            <Icon className=''>
              <i
                className={`fas fa-chevron-${viewHelp ? 'up' : 'down'}`}
              />
            </Icon>
          </Level.Item>
        </Level.Side>
      </Level>

      {viewHelp && (
        <Content>
          <blockquote className='is-size-7 py-1 rounded border has-text-centered'>
            <p className='mb-0'>
              A template can be used for
              {' '}
              <span className='has-text-weight-bold'>all</span>
              {' '}
              students.
            </p>
            <p className='mb-2'>Use the available placeholder keywords to to represent student information.</p>
            <Columns centered className='is-mobile has-text-left'>
              <Columns.Column narrow>
                <p className='mb-0'>Available student keywords are:</p>
                <p className='ml-4 mb-0'>[student-firstName]</p>
                <p className='ml-4 mb-0'>[student-lastName]</p>
                <p className='ml-4 mb-0'>[student-meetingLink]</p>
                <p className='ml-4 mb-2'>[student-githubUsername]</p>
              </Columns.Column>
              <Columns.Column narrow>
                <p className='mb-0'>Available tutor keywords are:</p>
                <p className='ml-4 mb-0'>[tutor-firstName]</p>
                <p className='ml-4 mb-0'>[tutor-lastName]</p>
                <p className='ml-4 mb-0'>[tutor-calendlyLink]</p>
                <p className='ml-4 mb-0'>[tutor-githubUsername]</p>
                <p className='ml-4 mb-2'>[tutor-email]</p>
              </Columns.Column>
            </Columns>
          </blockquote>
        </Content>
      )}
    </Box>
  );
};

export default HowItWorks;
