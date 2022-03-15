import React, { useContext, useEffect, useMemo } from 'react';
import { Columns } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CALENDLY_MEETINGS_FOR_COURSE } from '../../store/courses/actions';
import { ADD_MEETING_MODAL, SET_OPEN_MODAL } from '../../store/view/actions';
import { formatCalendlyMeetings, getCourseSectionListItemCount, readModel } from '../../utils';
import {
  DashboardContext,
  MEETINGS_SECTION,
} from '../../views/Dashboard/DashboardProvider';
import SectionContainer from '../Section/Container';
import SectionHeading from '../Section/Heading';
import MeetingsList from './MeetingsList';
import MeetingsListFilter from './MeetingsListFilter';
import { MeetingsContext } from './MeetingsProvider';

const MeetingsSection = () => {
  const { allCourses, selectedCourse } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const { toggleDisplayedSection } = useContext(DashboardContext);
  const {
    filterBy, setFilterBy, isActive,
    sectionName, filterOptions, displayedMeetings,
  } = useContext(MeetingsContext);

  const { meetings: allMeetings } = useMemo(
    () => allCourses[selectedCourse],
    [allCourses, selectedCourse],
  );

  // will be used for updating focused meetings based on checkbox settings, see students section
  const focusedMeetings = useMemo(() => Object.values(allMeetings), [allMeetings]);

  useEffect(() => {
    let isMounted = true;
    if (allCourses && selectedCourse) {
      const getCalendlyMeetings = async () => {
        const { calendlyMeetings: meetings } = await readModel({
          model: 'calendly/meetings',
          _id: selectedCourse,
        });
        if (!isMounted) return;
        dispatch({
          type: SET_CALENDLY_MEETINGS_FOR_COURSE,
          payload: {
            selectedCourse,
            calendlyMeetings: formatCalendlyMeetings(meetings),
          },
        });
      };

      if (allCourses[selectedCourse].calendly.data) getCalendlyMeetings();
    }

    return () => {
      isMounted = false;
    };
  }, [selectedCourse, allCourses, dispatch]);

  const headingComponent = (
    <SectionHeading
      sectionName={sectionName}
      count={
        getCourseSectionListItemCount({
          displayed: displayedMeetings.length,
          focused: focusedMeetings.length,
        })
      }
    />
  );

  const getChildren = () => {
    if (!isActive) return '';
    return (
      <>
        <Columns className='is-mobile ml-5 mt-2'>
          <p className='mr-3'>sort</p>
          <MeetingsListFilter meetings={Object.values(allMeetings)} />
        </Columns>

        <MeetingsList focusedMeetings={focusedMeetings} />
      </>
    );
  };

  return (
    <SectionContainer
      heading={headingComponent}
      active={isActive}
      toggleDisplayedSection={() => toggleDisplayedSection(MEETINGS_SECTION)}
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={() => dispatch({ type: SET_OPEN_MODAL, payload: ADD_MEETING_MODAL })}
    >
      {getChildren()}
    </SectionContainer>
  );
};
export default MeetingsSection;
