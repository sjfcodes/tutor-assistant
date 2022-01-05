import React, { useContext, useState } from 'react';
import { Columns } from 'react-bulma-components';
import { ModalContext } from '../../context';
import SectionContainer from '../SectionContainer';
import StudentsList from './StudentsList';
// import StudentsList from './StudentsList';
import StudentsListFilter from './StudentsListFilter';

const StudentsSection = () => {
  const { setOpenModal } = useContext(ModalContext);
  const [filterBy, setFilterBy] = useState('all');
  const [filterOptions, setFilterOptions] = useState(['']);
  const sectionName = 'Students';

  return (
    <SectionContainer
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={() => setOpenModal('addStudent')}
    >

      <Columns className='is-mobile ml-5'>
        <p className='mr-3'>view</p>
        <StudentsListFilter
          className=''
          sectionName={sectionName}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
      </Columns>

      <StudentsList
        filterBy={filterBy}
      />

    </SectionContainer>
  );
};
export default StudentsSection;
