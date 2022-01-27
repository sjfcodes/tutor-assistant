import React, { useContext } from 'react';
import { Columns } from 'react-bulma-components';
import { ModalContext } from '../../context';
import { HomeContext, STUDENTS_SECTION } from '../../views/Home/HomeProvider';
import SectionContainer from '../SectionContainer';
import StudentsList from './StudentsList';
import StudentsListFilter from './StudentsListFilter';
import { StudentsContext } from './StudentsProvider';

const StudentsSection = () => {
  const { setOpenModal } = useContext(ModalContext);
  const { handleActivate } = useContext(HomeContext);
  const {
    filterBy, setFilterBy,
    isActive, sectionName, filterOptions,
  } = useContext(StudentsContext);

  const getChildren = () => {
    if (!isActive) return '';
    return (
      <>
        <Columns className='is-mobile ml-5'>
          <p className='mr-3'>sort</p>
          <StudentsListFilter />
        </Columns>
        <StudentsList />
      </>
    );
  };

  return (
    <SectionContainer
      active={isActive}
      handleActivate={() => handleActivate(STUDENTS_SECTION)}
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={() => setOpenModal('AddStudent')}
    >
      {getChildren()}
    </SectionContainer>
  );
};
export default StudentsSection;
