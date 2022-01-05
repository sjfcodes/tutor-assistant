/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Icon } from 'react-bulma-components';
import { string, func } from 'prop-types';
import { LevelSide } from '../../../../BulmaHelpers';

const DefaultCourseLayout = ({
  courseName,
  courseId,
  courseToEdit,
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
        {/* <Icon
          className='mx-1 mr-5'
          onClick={() => handleEditNameClick(courseName, courseId)}
        >
          <i className={`icon-small has-text-info
            ${courseToEdit === courseId
    ? 'far fa-times-circle'
    : 'fas fa-pen'}`}
          />
        </Icon> */}
        <Button
          className='tag px-1'
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
  courseToEdit: string.isRequired,
  setCourseToDelete: func.isRequired,
  handleEditNameClick: func.isRequired,
};
