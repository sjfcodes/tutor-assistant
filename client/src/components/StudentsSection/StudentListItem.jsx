import React, { useContext, useEffect, useState } from 'react';
import { Icon, Level } from 'react-bulma-components';
import {
  string, number, oneOfType, bool,
} from 'prop-types';
import { CourseContext } from '../../context';
import { updateModel } from '../../utils';
import { LevelSide } from '../BulmaHelpers';
import ListItem from '../Forms/ListItem';

const StudentListItem = ({
  _id, property, value, count,
}) => {
  const [itemToEdit, setItemToEdit] = useState('');
  const [input, setInput] = useState(`${value}`);
  const { allCourses, setAllCourses, selectedCourse } = useContext(CourseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateModel({ model: 'student', body: { _id, [property]: input } });

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
      setItemToEdit('');
    } catch (error) {
      console.warn(error);
      setInput(value);
    }
  };

  useEffect(() => {
    if (!property || !itemToEdit) return;
    const selectedElement = document.querySelector(`input[name=${property}]`);
    if (selectedElement) selectedElement.focus();
  }, [itemToEdit, property]);

  return (
    <form name='studentItemForm' onSubmit={handleSubmit}>
      <Level
        renderAs='li'
        className={`student-li is-mobile px-3 ${(count % 2 !== 0) && 'has-background-grey-lighter'
        }`}
      >
        <LevelSide>
          {`${property}:`}
          <Icon className='mr-1' onClick={() => setItemToEdit(itemToEdit !== property ? property : '')}>
            <i className='fas fa-pen hover icon-small has-text-info' />
          </Icon>
        </LevelSide>
        <ListItem
          input={input}
          setInput={setInput}
          property={property}
          value={value}
          itemToEdit={itemToEdit}
          handleSubmit={handleSubmit}
        />
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
