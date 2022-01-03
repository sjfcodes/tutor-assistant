import React, { useContext, useEffect, useState } from 'react';
import { Icon, Level } from 'react-bulma-components';
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
    let model = 'meeting';
    let body = { _id, [property]: input };

    //  if modification is time related, adjust for time route
    const timeProperties = ['startTime', 'duration'];
    if (timeProperties.includes(property)) {
      const { startTime, duration } = allCourses[selectedCourse].meetings[_id];
      model = `meeting/time/${_id}`;
      body = {
        startTime: property === 'startTime' ? input : startTime,
        duration: property === 'duration' ? input : duration,
      };
    }

    try {
      const response = await updateModel({ model, body });
      console.log(response);
      // target the current property being edited of the selected meeting in the selected course
      const thisCourse = { ...allCourses[selectedCourse] };
      const allMeetings = { ...thisCourse.meetings };

      setAllCourses({
        ...allCourses,
        [selectedCourse]: {
          ...thisCourse,
          meetings: {
            ...allMeetings,
            [_id]: { ...response, type },
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
          {
            (type !== 'calendly' && property !== 'endTime') && (
              <Icon className='edit-icon mr-1' onClick={() => setItemToEdit(itemToEdit !== property ? property : '')}>
                <i className='fas fa-pen hover icon-small has-text-info' />
              </Icon>
            )
          }

        </LevelSide>
        <ListItem
          value={value}
          property={property}
          type={type}
          input={input}
          setInput={setInput}
          itemToEdit={itemToEdit}
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
