import React, { useContext, useEffect, useState } from 'react';
import { Level } from 'react-bulma-components';
import {
  string, number, oneOfType, bool, array,
} from 'prop-types';
import { CourseContext } from '../../context';
import { updateModel } from '../../utils';
import { LevelSide } from '../BulmaHelpers';
import ListItem from '../Forms/ListItem';

const MeetingListItem = ({
  _id, property, value, type, count,
}) => {
  const [itemToEdit, setItemToEdit] = useState('');
  const [input, setInput] = useState(`${value}`);
  const { allCourses, setAllCourses, selectedCourse } = useContext(CourseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateModel({ model: 'meeting', body: { _id, [property]: input } });
      // target the current property being edited of the selected meeting in the selected course
      const thisCourse = { ...allCourses[selectedCourse] };
      const allMeetings = { ...thisCourse.meetings };
      const thisMeeting = { ...allMeetings[_id] };

      setAllCourses({
        ...allCourses,
        [selectedCourse]: {
          ...thisCourse,
          meetings: {
            ...allMeetings,
            [_id]: {
              ...thisMeeting,
              [property]: input,
            },
          },
        },
      });
      setItemToEdit('');
    } catch (error) {
      setInput(value);
    }
  };

  useEffect(() => {
    if (!property || !itemToEdit) return;
    document.querySelector(`input[name=${property}]`).focus();
  }, [itemToEdit, property]);

  return (
    <form name='MeetingItemForm' onSubmit={handleSubmit}>
      <Level
        renderAs='li'
        className={`student-li is-mobile px-3 ${(count % 2 !== 0) && 'has-background-grey-lighter'
        }`}
      >
        <LevelSide>
          {`${property}:`}
        </LevelSide>
        <ListItem
          value={value}
          property={property}
          type={type}
          input={input}
          setInput={setInput}
          itemToEdit={itemToEdit}
          setItemToEdit={setItemToEdit}
          handleSubmit={handleSubmit}
        />
      </Level>
    </form>
  );
};
export default MeetingListItem;

MeetingListItem.propTypes = {
  _id: string.isRequired,
  property: string.isRequired,
  type: string.isRequired,
  value: oneOfType([number, string, bool, array]).isRequired,
  count: number.isRequired,
};
