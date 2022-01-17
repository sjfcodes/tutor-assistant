import { func, string } from 'prop-types';
import React, { useContext } from 'react';
import { Form } from 'react-bulma-components';
import { CourseContext } from '../../context';
import { getLocalDateString } from '../../utils';

const MeetingSelector = ({ className, meetingId, onChange }) => {
  const { allCourses, selectedCourse } = useContext(CourseContext);

  return (
    <Form.Control className={className}>
      <Form.Label className='mb-0'>select a meeting</Form.Label>
      <Form.Select
        color='info'
        name='meetingId'
        value={meetingId}
        placeholder='meeting'
        onChange={onChange}
      >
        <option value=''>-</option>
        {
          Object
            .entries(allCourses[selectedCourse].meetings)
            .map(([key, { startTime }]) => (
              <option key={key} value={key}>
                {`${getLocalDateString(startTime)}`}
              </option>
            ))
        }
      </Form.Select>
    </Form.Control>
  );
};

export default MeetingSelector;

MeetingSelector.propTypes = {
  meetingId: string.isRequired,
  onChange: func.isRequired,
  className: string,
};

MeetingSelector.defaultProps = {
  className: '',
};
