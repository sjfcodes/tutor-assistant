import React, { useContext } from 'react';
import { Columns } from 'react-bulma-components';
import { useDispatch } from 'react-redux';
import { ADD_TASK_MODAL, SET_OPEN_MODAL } from '../../store/view/actions';
import { DashboardContext, TASKS_SECTION } from '../../views/Dashboard/DashboardProvider';
import SectionContainer from '../Section/Container';
import SectionHeading from '../Section/Heading';
import TasksList from './TasksList';
import TasksListFilter from './TasksListFilter';
import { TasksContext } from './TasksProvider';

const TasksSection = () => {
  const dispatch = useDispatch();
  const { handleToggle } = useContext(DashboardContext);
  const {
    count,
    filterBy, setFilterBy,
    isActive, sectionName, filterOptions,
  } = useContext(TasksContext);

  const toggleSection = () => handleToggle(TASKS_SECTION);
  const getTaskCount = () => (count || '~');
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

  const heading = (
    <SectionHeading
      sectionName={sectionName}
      count={getTaskCount()}
    />
  );

  const openAddTaskModal = () => dispatch({ type: SET_OPEN_MODAL, payload: ADD_TASK_MODAL });

  return (
    <SectionContainer
      heading={heading}
      active={isActive}
      handleToggle={toggleSection}
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
