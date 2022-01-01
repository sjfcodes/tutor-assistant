import React from 'react';
import { Button } from 'react-bulma-components';
import { string, func } from 'prop-types';
import { LevelSide } from '../../../../BulmaHelpers';

const DefaultCourseLayout = ({
  courseName,
  courseId,
  handleEditNameClick,
  setCourseToDelete,
}) => (
  <>
    <LevelSide align='left'>
      {courseName}
    </LevelSide>
    <LevelSide align='right'>
      <Button.Group>
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
    </LevelSide>
  </>
);
export default DefaultCourseLayout;

DefaultCourseLayout.propTypes = {
  courseName: string.isRequired,
  courseId: string.isRequired,
  setCourseToDelete: func.isRequired,
  handleEditNameClick: func.isRequired,
};
