import React from 'react';
import { func, string } from 'prop-types';
import { Button, Level } from 'react-bulma-components';
import { LevelSide } from '../../../../BulmaHelpers';

const DeleteCourseLayout = ({ courseName, courseId, handleDeleteCourse }) => (
  <>
    <LevelSide>
      <Level.Item>{courseName}</Level.Item>
    </LevelSide>
    <LevelSide>
      <Button.Group>
        <Button
          outlined
          size='small'
          color='danger'
          className='tag'
          textSize={6}
          onClick={() => handleDeleteCourse(courseId)}
        >
          confirm
        </Button>

        <Button
          size='small'
          color='danger'
          onClick={() => handleDeleteCourse(null)}
        >
          cancel
        </Button>
      </Button.Group>
    </LevelSide>
  </>
);
export default DeleteCourseLayout;

DeleteCourseLayout.propTypes = {
  courseName: string.isRequired,
  courseId: string.isRequired,
  handleDeleteCourse: func.isRequired,
};
