import React, { useContext, useState } from 'react';
import {
  Box, Columns, Form, Heading, Icon, Level,
} from 'react-bulma-components';
import { CourseContext, ModalContext } from '../../context';
import { LevelSide } from '../BulmaHelpers';
import AllMeetings from './AllMeetings';

const MeetingsSection = () => {
  const { calendlyMeetings } = useContext(CourseContext);
  const { setOpenModal } = useContext(ModalContext);
  const [filterBy, setFilterBy] = useState('all');

  return (
    <Box className='has-background-white py-1 px-3 mb-3'>
      <Level renderAs='div' className='is-mobile mt-2'>
        <LevelSide>
          <Heading size={4} className='mr-5'>Meetings</Heading>
        </LevelSide>
        <LevelSide>
          <Icon
            className='p-4 mr-1 hover'
            color='primary'
            onClick={() => setOpenModal('addMeeting')}
          >
            <i className='fas fa-plus' />
          </Icon>
        </LevelSide>
      </Level>

      <Columns className='is-mobile ml-5 '>
        <p className='mr-3'>view</p>
        <Form.Field>
          <select
            className='py-0 has-text-centered'
            value={filterBy}
            onChange={({ target: { value } }) => setFilterBy(value)}
          >
            <option value='all'>all</option>
            {
              Object.keys(calendlyMeetings).length
              && (
                <>
                  <option value='tutorly'>tutorly</option>
                  <option value='calendly'>calendly</option>
                </>
              )
            }
          </select>
        </Form.Field>
        <p className='ml-3'>meetings</p>
      </Columns>
      <AllMeetings filterBy={filterBy} />
    </Box>
  );
};
export default MeetingsSection;
