import React, { useContext } from 'react';
import { Columns } from 'react-bulma-components';
import { ModalContext } from '../../context';
import { HomeContext, TASKS_SECTION } from '../../views/Home/HomeProvider';
import SectionContainer from '../SectionContainer';
import TasksList from './TasksList';
import TasksListFilter from './TasksListFilter';
import { TasksContext } from './TasksProvider';

const TasksSection = () => {
  const { setOpenModal } = useContext(ModalContext);
  const { handleActivate } = useContext(HomeContext);
  const {
    filterBy, setFilterBy,
    isActive, sectionName, filterOptions,
  } = useContext(TasksContext);

  const getChildren = () => {
    if (!isActive) return '';
    return (
      <>
        <Columns className='is-mobile ml-5'>
          <p className='mr-3'>sort</p>
          <TasksListFilter />
        </Columns>
        <TasksList />
      </>
    );
  };

  return (
    <SectionContainer
      active={isActive}
      handleActivate={() => handleActivate(TASKS_SECTION)}
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={() => setOpenModal('AddTask')}
    >
      {getChildren()}
    </SectionContainer>
  );
};

export default TasksSection;
