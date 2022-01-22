import React, { useContext, useState } from 'react';
import { Columns } from 'react-bulma-components';
import { ModalContext } from '../../context';
import SectionContainer from '../SectionContainer';
import StudentsList from './StudentsList';
// import StudentsList from './StudentsList';
import StudentsListFilter from './StudentsListFilter';

const StudentsSection = () => {
  const { setOpenModal } = useContext(ModalContext);
  const [filterOptions, setFilterOptions] = useState(['first name', 'last name', 'graduation date']);
  const [filterBy, setFilterBy] = useState(filterOptions[0]);
  const sectionName = 'Students';

  return (
    <SectionContainer
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={() => setOpenModal('AddStudent')}
    >

      <Columns className='is-mobile ml-5'>
        <p className='mr-3'>sort</p>
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
