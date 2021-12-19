import React, { useContext, useEffect, useState } from 'react';
import { Level, Icon } from 'react-bulma-components';
import {
  string, number, oneOfType, bool,
} from 'prop-types';
import { CourseContext } from '../../context';
import { getLocalDateString, updateModel } from '../../utils';
import { convertStrToBool } from '../../utils/helpers/forms';

const StudentListItem = ({
  _id, property, value, count,
}) => {
  const [itemToEdit, setItemToEdit] = useState();
  const [input, setInput] = useState(value);
  const [val, setVal] = useState();
  const { allCourses, setAllCourses, selectedCourse } = useContext(CourseContext);

  const inputHasBeenModified = () => `${value}`.trim() !== `${input}`.trim();

  const handleInputChange = ({ target }) => {
    let newValue = target.value;
    if (newValue === 'true' || newValue === 'false') newValue = convertStrToBool(newValue);
    setInput(newValue);
  };

  const handleCancelEdit = () => {
    setItemToEdit();
    setInput(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateModel('student', { _id, [property]: input });

      // target the current property being edited of the selected student in the selected course
      const thisCourse = { ...allCourses[selectedCourse] };
      const allStudents = { ...thisCourse.students };
      const thisStudent = { ...allStudents[_id] };

      setAllCourses({
        ...allCourses,
        [selectedCourse]: {
          ...thisCourse,
          students: {
            ...allStudents,
            [_id]: {
              ...thisStudent,
              [property]: input,
            },
          },
        },
      });
    } catch (error) {
      console.warn(error);
      setInput(value);
    }
    setItemToEdit();
  };

  useEffect(() => {
    const formatBooleanSpan = (boolean) => <span className={`has-text-${value ? 'success' : 'danger'}`}>{`${boolean}`}</span>;
    let isMounted = true;
    switch (property) {
    case 'githubUsername':
      return isMounted && setVal(
        <a
          href={`https://github.com/${value}`}
          className='break'
          target='_blank'
          rel='noreferrer'
        >
          {`https://github.com/${value}`}
        </a>,
      );
    case 'meetingLink':
      return isMounted && setVal(
        <a href={value} className='break' target='_blank' rel='noreferrer'>
          {value}
        </a>,
      );
    case 'graduationDate':
      return isMounted && setVal(
        <span>{new Date(value * 1000).toLocaleDateString()}</span>,
      );
    case 'createdAt':
      return isMounted && setVal(<span>{getLocalDateString(value)}</span>);

    case 'fullTimeCourse':
      return isMounted && setVal(formatBooleanSpan(value));

    case 'reassignment':
      return isMounted && setVal(formatBooleanSpan(value));

    case 'recurringMeeting':
      return isMounted && setVal(formatBooleanSpan(value));

    default:
      if (isMounted) setVal(<span>{`${value}`}</span>);
    }
    return () => { isMounted = false; };
  }, [property, value]);

  useEffect(() => {
    if (!property || !itemToEdit) return;
    document.querySelector(`input[name=${property}]`).focus();
  }, [itemToEdit, property]);

  return (
    <form name='studentItemForm' onSubmit={handleSubmit}>
      <Level
        renderAs='li'
        className={`student-li is-mobile px-3 ${(count % 2 !== 0) && 'has-background-grey-lighter'
        }`}
      >
        <Level.Side>
          <Level.Item>
            {`${property}:`}
          </Level.Item>
        </Level.Side>
        <Level.Side>
          <Level.Item>
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
          </Level.Item>
        </Level.Side>
      </Level>
    </form>
  );
};
export default StudentListItem;

StudentListItem.propTypes = {
  _id: string.isRequired,
  property: string.isRequired,
  value: oneOfType([string, number, bool]).isRequired,
  count: number.isRequired,
};
