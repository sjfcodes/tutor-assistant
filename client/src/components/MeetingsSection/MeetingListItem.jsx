import React, { useContext, useEffect, useState } from 'react';
import { Level, Icon } from 'react-bulma-components';
import { string, number, oneOfType } from 'prop-types';
import { CourseContext } from '../../context';
import { getLocalDateString, updateModel } from '../../utils';
import { LevelSide } from '../BulmaHelpers';

const MeetingListItem = ({
  _id, property, value, count,
}) => {
  const [itemToEdit, setItemToEdit] = useState();
  const [input, setInput] = useState(value);
  const [val, setVal] = useState();
  const { allCourses, setAllCourses, selectedCourse } = useContext(CourseContext);

  const inputHasBeenModified = () => `${value}`.trim() !== `${input}`.trim();
  const handleInputChange = ({ target }) => {
    let newValue = target.value;
    if (target.name === 'duration') newValue = newValue ? parseInt(newValue, 10) : 0;
    setInput(newValue);
  };

  const handleCancelEdit = () => {
    setItemToEdit();
    setInput(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateModel('meeting', { _id, [property]: input });
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
    } catch (error) {
      setInput(value);
    }
    setItemToEdit();
  };

  useEffect(() => {
    let isMounted = true;

    switch (property) {
    case 'githubUsername':
      return isMounted && setVal(
        <a
          href={`https://github.com/${value}`}
          target='_blank'
          rel='noreferrer'
        >
          {`https://github.com/${value}`}

        </a>,
      );
    case 'meetingLink':
      return isMounted && setVal(
        <a href={value} target='_blank' rel='noreferrer'>
          {value}
        </a>,
      );
    case 'graduationDate':
      return isMounted && setVal(<span>{getLocalDateString(value)}</span>);

    case 'startDate':
      return isMounted && setVal(<span>{getLocalDateString(value)}</span>);

    case 'createdAt':
      return isMounted && setVal(<span>{getLocalDateString(value)}</span>);

    default:
      if (isMounted) return setVal(<span>{`${value}`}</span>);
    }
    return () => { isMounted = false; };
  }, [property, value]);

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
        <LevelSide>
          {
            itemToEdit === property
              ? (
                <>
                  <input
                    type='input'
                    name={property}
                    value={input}
                    className='li-input mr-5 mb-2'
                    onChange={handleInputChange}
                  />
                  {
                    inputHasBeenModified()
                      && (
                        <Icon className='save-icon mb-1 mr-1' onClick={handleSubmit}>
                          <i className='far fa-save hover has-text-success' />
                        </Icon>
                      )
                  }
                </>
              )
              : <span className='mr-5'>{val}</span>
          }
          {
            itemToEdit === property
              ? (
                <Icon className='edit-icon mr-1' onClick={handleCancelEdit}>
                  <i className='far fa-times-circle hover has-text-info' />
                </Icon>
              ) : (
                property !== 'createdAt' && (
                  <Icon className='edit-icon mr-1' onClick={() => setItemToEdit(property)}>
                    <i className='fas fa-pen hover icon-small has-text-info' />
                  </Icon>
                )
              )
          }
        </LevelSide>
      </Level>
    </form>
  );
};
export default MeetingListItem;

MeetingListItem.propTypes = {
  _id: string.isRequired,
  property: string.isRequired,
  value: oneOfType([number, string]).isRequired,
  count: number.isRequired,
};
