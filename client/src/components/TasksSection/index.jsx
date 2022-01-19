import React, { useContext, useState } from 'react';
import { Columns } from 'react-bulma-components';
import { ModalContext } from '../../context';
import SectionContainer from '../SectionContainer';
import TasksList from './TasksList';
import TasksListFilter from './TasksListFilter';

const TasksSection = () => {
  const { setOpenModal } = useContext(ModalContext);
  const [filterBy, setFilterBy] = useState('all');
  const [filterOptions, setFilterOptions] = useState(['tutor', 'student', 'meeting']);
  const sectionName = 'Tasks';

  return (
    <SectionContainer
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={() => setOpenModal('AddTask')}
    >

      <Columns className='is-mobile ml-5'>
        <p className='mr-3'>view</p>
        <TasksListFilter
          className=''
          sectionName={sectionName}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
      </Columns>

      <TasksList
        filterBy={filterBy}
      />

    </SectionContainer>
  );
};

export default TasksSection;
