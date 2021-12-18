import React from 'react';
import { func, string } from 'prop-types';
import { Button, Level } from 'react-bulma-components';

const DeleteCourseLayout = ({ courseName, courseId, handleDeleteCourse }) => (
  <>
    <Level.Side>
      <Level.Item>{courseName}</Level.Item>
    </Level.Side>
    <Level.Side>
      <Level.Item>
        <Button.Group className='mb-1'>
          <Button
            outlined
            size='small'
            color='danger'
            onClick={() => handleDeleteCourse(null)}
          >
            cancel
          </Button>

          <Button
            size='small'
            color='danger'
            onClick={() => handleDeleteCourse(courseId)}
          >
            confirm
          </Button>
        </Button.Group>
      </Level.Item>
    </Level.Side>
  </>
);
export default DeleteCourseLayout;

DeleteCourseLayout.propTypes = {
  courseName: string.isRequired,
  courseId: string.isRequired,
  handleDeleteCourse: func.isRequired,
};
