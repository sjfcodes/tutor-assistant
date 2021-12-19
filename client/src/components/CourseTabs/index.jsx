import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { Tabs } from 'react-bulma-components';
import { CourseContext, ModalContext } from '../../context';
import { AddCourse } from '../Modals';
import './style.css';

const { Tab } = Tabs;

// eslint-disable-next-line react/prop-types
const CourseTabs = ({ className }) => {
  const [courseTabs, setCourseTabs] = useState(null);
  const { allCourses, selectedCourse, setSelectedCourse } = useContext(CourseContext);
  // eslint-disable-next-line no-unused-vars
  const { setOpenModal } = useContext(ModalContext);

  const handleUpdate = useCallback(
    (e) => {
      if (!allCourses) return;
      const {
        target: {
          parentNode: { classList },
        },
      } = e;

      // if selected tab is already active, return
      if (classList.contains('is-active')) return;

      // toggle current active tab off
      document
        .querySelector('#course-tabs ul li.is-active')
        .classList.toggle('is-active');

      // toggle new tab on
      classList.toggle('is-active');
    },
    [allCourses],
  );

  useEffect(() => {
    if (!allCourses) return;
    const i = 0;
    const arr = [];
    Object.entries(allCourses).forEach(([key, { name, _id }]) => {
      arr.push(
        <Tab
          key={key}
          id={key}
          className='rounded'
          active={(!selectedCourse || selectedCourse === _id)}
          onClick={() => setSelectedCourse(_id)}
        >
          {name}
        </Tab>,
      );
      if (!selectedCourse && i === 0) setSelectedCourse(_id);
    });

    setCourseTabs(arr);
  }, [allCourses, handleUpdate, selectedCourse, setSelectedCourse]);

  return (
    <>
      <Tabs
        align='left'
        type='boxed'
        id='course-tabs'
        // className='background-clear'
        className={className}
      >
        {courseTabs}
        <Tab
          className=''
          onClick={() => setOpenModal('addCourse')}
        >
          Add Course
        </Tab>
      </Tabs>
      <AddCourse />
    </>
  );
};
export default CourseTabs;
