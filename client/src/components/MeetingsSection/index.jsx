import React, { useContext, useEffect, useState } from 'react';
import { Columns } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { ModalContext } from '../../context';
import { SET_CALENDLY_MEETINGS } from '../../store/calendly/actions';
import { formatCalendlyMeetings, readModel } from '../../utils';
import { HomeContext, MEETINGS_SECTION } from '../../views/Home/HomeProvider';
import SectionContainer from '../Section/Container';
import SectionHeading from '../Section/Heading';
import MeetingsList from './MeetingsList';
import MeetingsListFilter from './MeetingsListFilter';
import { MeetingsContext } from './MeetingsProvider';

const MeetingsSection = () => {
  const { allCourses, selectedCourse } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const { setOpenModal } = useContext(ModalContext);
  const { handleToggle } = useContext(HomeContext);
  const {
    filterBy, setFilterBy,
    isActive, sectionName, filterOptions,
  } = useContext(MeetingsContext);
  const [calendlyCount, setCalendlyCount] = useState(0);

  const toggleSection = () => handleToggle(MEETINGS_SECTION);
  const getMeetingCount = () => {
    let count = 0;
    if (allCourses && selectedCourse) count += allCourses[selectedCourse].meetingCount;
    if (calendlyCount) count += calendlyCount;
    return count > 0 ? count : '~';
  };

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
      setCalendlyCount(meetings.length);
    };
    if (allCourses[selectedCourse].calendly.data) getCalendlyMeetings();

    return () => { isMounted = false; };
  }, [selectedCourse, allCourses, dispatch]);

  const heading = (
    <SectionHeading
      sectionName={sectionName}
      count={getMeetingCount()}
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
      addListItemClick={() => setOpenModal('AddMeeting')}
    >
      { isActive && (
        <>
          <Columns className='is-mobile ml-5'>
            <p className='mr-3'>sort</p>
            <MeetingsListFilter />
          </Columns>

          <MeetingsList
            filterBy={filterBy}
          />
        </>
      )}
    </SectionContainer>
  );
};
export default MeetingsSection;
