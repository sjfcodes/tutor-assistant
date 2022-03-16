import React, { useContext, useMemo } from 'react';
import { Columns } from 'react-bulma-components';
import { useDispatch } from 'react-redux';
import { ADD_TASK_MODAL, SET_OPEN_MODAL } from '../../store/view/actions';
import { getCourseSectionListItemCount } from '../../utils';
import { DashboardContext, COURSE_SECTION_TASKS } from '../../views/Dashboard/DashboardProvider';
import SectionContainer from '../Section/Container';
import SectionHeading from '../Section/Heading';
import TasksList from './TasksList';
import TasksListFilter from './TasksListFilter';
import { TasksContext } from './TasksProvider';

const TasksSection = () => {
  const dispatch = useDispatch();
  const { toggleDisplayedSection } = useContext(DashboardContext);
  const {
    filterBy, setFilterBy,
    studentTasks, meetingTasks, tutorTasks,
    isActive, sectionName, filterOptions,
  } = useContext(TasksContext);

  const listItemCount = useMemo(
    () => {
      const getAllTaskCount = () => studentTasks.length + meetingTasks.length + tutorTasks.length;

      return getCourseSectionListItemCount({
        displayed: getAllTaskCount(),
        focused: null,
      });
    },
    [meetingTasks, studentTasks, tutorTasks],
  );

  const headingComponent = (
    <SectionHeading
      sectionName={sectionName}
      count={listItemCount}
    />
  );

  const getChildren = () => {
    if (!isActive) return '';
    return (
      <>
        <Columns className='is-mobile ml-5 mt-2'>
          <p className='mr-3'>sort</p>
          <TasksListFilter />
        </Columns>
        <TasksList />
      </>
    );
  };

  const openAddTaskModal = () => dispatch({ type: SET_OPEN_MODAL, payload: ADD_TASK_MODAL });

  return (
    <SectionContainer
      heading={headingComponent}
      active={isActive}
      toggleDisplayedSection={() => toggleDisplayedSection(COURSE_SECTION_TASKS)}
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={openAddTaskModal}
      disabled
    >
      {getChildren()}
    </SectionContainer>
  );
};

export default TasksSection;
