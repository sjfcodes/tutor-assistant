import React, { useContext, useEffect, useState } from 'react';
import { Columns } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from '../../context';
import { SET_CALENDLY_MEETINGS } from '../../store/calendly/actions';
import { formatCalendlyMeetings, readModel } from '../../utils';
import SectionContainer from '../SectionContainer';
import MeetingsList from './MeetingsList';
import MeetingsListFilter from './MeetingsListFilter';

const MeetingsSection = () => {
  const { setOpenModal } = useContext(ModalContext);
  const [filterOptions, setFilterOptions] = useState(['all', 'tutorly']);
  const [filterBy, setFilterBy] = useState(filterOptions[0]);
  const sectionName = 'Meetings';
  const { allCourses, selectedCourse } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    if (!selectedCourse || !allCourses) return '';
    const getCalendlyMeetings = async () => {
      const { calendlyMeetings: meetings } = await readModel({ model: 'calendly/meetings', _id: selectedCourse });
      if (!isMounted) return;
      dispatch({
        type: SET_CALENDLY_MEETINGS,
        payload: formatCalendlyMeetings(meetings),
      });
    };
    if (allCourses[selectedCourse].calendly.data) getCalendlyMeetings();

    return () => { isMounted = false; };
  }, [selectedCourse, allCourses, dispatch]);

  return (
    <SectionContainer
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={() => setOpenModal('AddMeeting')}
    >

      <Columns className='is-mobile ml-5'>
        <p className='mr-3'>sort</p>
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
