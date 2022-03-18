import React, {
  useEffect, useMemo, useState,
} from 'react';
import { shape, string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import MeetingDetailList from '../MeetingDetailList';
import ListItemContainer from '../../List/ListItemContainer';
import MeetingsListItemLayout from './MeetingsListItemLayout';
import { COURSE_SECTION_MEETINGS, SET_ACTIVE_COMPONENT } from '../../../store/view/actions';

const MeetingListItem = ({ meeting }) => {
  const dispatch = useDispatch();
  const {
    courses: { allCourses, selectedCourse },
    view: { component, selectedComponentItemId },
  } = useSelector((state) => state);

  const [listItemDetails, setListItemDetails] = useState('');

  const { _id, studentId } = meeting;

  const toggleViewMeeting = () => (
    dispatch({
      type: SET_ACTIVE_COMPONENT,
      payload: {
        selectedComponentItemId: selectedComponentItemId === _id ? '' : _id,
      },
    })
  );

  const student = useMemo(
    () => allCourses[selectedCourse].students[studentId] || {},
    [allCourses, selectedCourse, studentId],
  );

  useEffect(() => {
    if (component !== COURSE_SECTION_MEETINGS) return '';
    if (selectedComponentItemId !== _id) return setListItemDetails('');
    return setListItemDetails(<MeetingDetailList meeting={meeting} _id={_id} />);
  }, [meeting, _id, selectedComponentItemId, component]);

  return (
    <ListItemContainer
      itemId={_id}
      selectedComponentItemId={selectedComponentItemId}
      toggleViewItem={toggleViewMeeting}
      listItemDetails={listItemDetails}
    >
      <MeetingsListItemLayout
        student={student}
        meeting={meeting}
      />
    </ListItemContainer>
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
};
