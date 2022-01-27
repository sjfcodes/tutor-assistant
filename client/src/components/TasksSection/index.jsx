import React, { useContext } from 'react';
import { Columns } from 'react-bulma-components';
import { ModalContext } from '../../context';
import { HomeContext, TASKS_SECTION } from '../../views/Home/HomeProvider';
import SectionContainer from '../Section/Container';
import SectionHeading from '../Section/Heading';
import TasksList from './TasksList';
import TasksListFilter from './TasksListFilter';
import { TasksContext } from './TasksProvider';

const TasksSection = () => {
  const { setOpenModal } = useContext(ModalContext);
  const { handleToggle } = useContext(HomeContext);
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
        <Columns className='is-mobile ml-5'>
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

  return (
    <SectionContainer
      heading={heading}
      active={isActive}
      handleToggle={toggleSection}
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
