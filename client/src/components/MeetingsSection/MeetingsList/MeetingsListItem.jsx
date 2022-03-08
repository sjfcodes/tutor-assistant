import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { shape, string } from 'prop-types';
import { useSelector } from 'react-redux';
import MeetingDetailList from '../MeetingDetailList';
import ListItemContainer from '../../List/ListItemContainer';
import MeetingsListItemLayout from './MeetingsListItemLayout';
import { DashboardContext, MEETINGS_SECTION } from '../../../views/Dashboard/DashboardProvider';

const MeetingListItem = ({ meeting }) => {
  const { allCourses, selectedCourse } = useSelector((state) => state.courses);

  const { activeComponent, setActiveComponent } = useContext(DashboardContext);
  const { component, selectedItemId } = activeComponent;

  const [listItemDetails, setListItemDetails] = useState('');

  const { _id, studentId } = meeting;

  const toggleViewMeeting = () => (
    setActiveComponent({
      ...activeComponent,
      selectedItemId: selectedItemId === _id ? '' : _id,
    })
  );

  const student = useMemo(
    () => allCourses[selectedCourse].students[studentId] || {},
    [allCourses, selectedCourse, studentId],
  );

  useEffect(() => {
    if (component !== MEETINGS_SECTION) return '';
    if (selectedItemId !== _id) return setListItemDetails('');
    return setListItemDetails(<MeetingDetailList meeting={meeting} _id={_id} />);
  }, [meeting, _id, selectedItemId, component]);

  return (
    <ListItemContainer
      itemId={_id}
      selectedItemId={selectedItemId}
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
