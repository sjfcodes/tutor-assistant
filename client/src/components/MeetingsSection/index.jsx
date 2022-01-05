import React, { useContext, useState } from 'react';
import { Columns } from 'react-bulma-components';
import { ModalContext } from '../../context';
import SectionContainer from '../SectionContainer';
import MeetingsList from './MeetingsList';
import MeetingsListFilter from './MeetingsListFilter';

const MeetingsSection = () => {
  const { setOpenModal } = useContext(ModalContext);
  const [filterBy, setFilterBy] = useState('all');
  const [filterOptions, setFilterOptions] = useState(['tutorly']);
  const sectionName = 'Meetings';

  return (
    <SectionContainer
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={() => setOpenModal('addMeeting')}
    >

      <Columns className='is-mobile ml-5'>
        <p className='mr-3'>view</p>
        <MeetingsListFilter
          sectionName={sectionName}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
        />
      </Columns>

      <MeetingsList
        filterBy={filterBy}
      />

    </SectionContainer>
  );
};
export default MeetingsSection;
