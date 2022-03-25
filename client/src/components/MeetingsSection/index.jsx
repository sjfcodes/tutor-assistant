import React, { useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CALENDLY_MEETINGS_FOR_COURSE } from '../../store/courses/actions';
import {
  ADD_MEETING_MODAL,
  COURSE_SECTION_MEETINGS,
  SET_ACTIVE_COMPONENT,
  SET_OPEN_MODAL,
} from '../../store/view/actions';
import {
  formatCalendlyMeetings,
  readModel,
} from '../../utils';
import SectionContainer from '../Section/Container';
import MeetingHeading from './MeetingHeading';
import MeetingsList from './MeetingsList';
import { MeetingsContext } from './MeetingsProvider';
import MeetingToolbar from './MeetingToolbar';

const MeetingsSection = () => {
  const dispatch = useDispatch();
  const {
    courses: { allCourses, selectedCourse },
    view: { activeComponent: { selectedComponent } },
  } = useSelector((state) => state);
  const {
    isActive,
    filterBy,
    setFilterBy,
    sectionName,
    filterOptions,
    focusedMeetings,
  } = useContext(MeetingsContext);

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

  const children = useMemo(() => {
    if (!isActive) return '';
    return (
      <MeetingsList focusedMeetings={focusedMeetings} />
    );
  }, [focusedMeetings, isActive]);

  const toggleDisplayedSection = () => {
    dispatch({
      type: SET_ACTIVE_COMPONENT,
      payload: {
        selectedComponent: selectedComponent !== COURSE_SECTION_MEETINGS
          ? COURSE_SECTION_MEETINGS
          : '',
      },
    });
  };

  return (
    <SectionContainer
      active={isActive}
      heading={<MeetingHeading />}
      toolbar={isActive && <MeetingToolbar />}
      toggleDisplayedSection={toggleDisplayedSection}
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={() => dispatch({ type: SET_OPEN_MODAL, payload: ADD_MEETING_MODAL })}
    >
      {children}
    </SectionContainer>
  );
};
export default MeetingsSection;
