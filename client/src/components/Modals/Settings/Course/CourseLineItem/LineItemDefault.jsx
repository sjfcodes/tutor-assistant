import React from 'react';
import { Button, Level } from 'react-bulma-components';
import { string, func } from 'prop-types';

const LineItemDefault = ({
  courseName,
  courseId,
  handleEditNameClick,
  setCourseToDelete,
}) => (
  <>
    <Level.Side align='left'>
      <Level.Item>{courseName}</Level.Item>
    </Level.Side>
    <Level.Side align='right'>
      <Level.Item>
        <Button.Group className='mb-1'>
          <Button
            size='small'
            color='info'
            onClick={() => handleEditNameClick(courseName, courseId)}
          >
            edit name
          </Button>
          <Button
            outlined
            size='small'
            color='danger'
            onClick={() => setCourseToDelete(courseId)}
          >
            delete
          </Button>
        </Button.Group>
      </Level.Item>
    </Level.Side>
  </>
);
export default LineItemDefault;

LineItemDefault.propTypes = {
  courseName: string.isRequired,
  courseId: string.isRequired,
  setCourseToDelete: func.isRequired,
  handleEditNameClick: func.isRequired,
};
