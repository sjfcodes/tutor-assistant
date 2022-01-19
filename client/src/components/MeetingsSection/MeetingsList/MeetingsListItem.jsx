import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { func, shape, string } from 'prop-types';
import { CourseContext } from '../../../context';
import MeetingDetailList from '../MeetingDetailList';
import ListItemContainer from '../../List/ListItemContainer';
import MeetingsListItemLayout from './MeetingsListItemLayout';

const MeetingListItem = ({ meeting, setSelectedMeetingId, selectedMeetingId }) => {
  const { allCourses, selectedCourse } = useContext(CourseContext);
  const [listItem, setListItem] = useState('');
  const [listItemDetails, setListItemDetails] = useState('');

  const { _id, studentId } = meeting;

  const toggleViewMeeting = () => (
    selectedMeetingId === _id
      ? setSelectedMeetingId('')
      : setSelectedMeetingId(_id)
  );

  const student = useMemo(
    () => allCourses[selectedCourse].students[studentId] || {},
    [allCourses, selectedCourse, studentId],
  );

  useEffect(() => {
    setListItem(
      <MeetingsListItemLayout
        student={student}
        meeting={meeting}
      />,
    );
  }, [student, meeting]);

  useEffect(() => {
    if (selectedMeetingId !== _id) return setListItemDetails('');
    return setListItemDetails(<MeetingDetailList meeting={meeting} _id={_id} />);
  }, [meeting, _id, selectedMeetingId]);

  return (
    <ListItemContainer
      itemId={_id}
      selectedItemId={selectedMeetingId}
      toggleViewItem={toggleViewMeeting}
      listItem={listItem}
      listItemDetails={listItemDetails}
    />
  );
};
export default MeetingListItem;

MeetingListItem.propTypes = {
  meeting: shape({
    _id: string.isRequired,
    type: string.isRequired,
    endTime: string.isRequired,
    startTime: string.isRequired,
    status: string.isRequired,
    createdAt: string.isRequired,
  }).isRequired,
  selectedMeetingId: string.isRequired,
  setSelectedMeetingId: func.isRequired,
};
