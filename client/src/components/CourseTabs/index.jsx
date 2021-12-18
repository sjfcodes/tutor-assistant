import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { Tabs } from 'react-bulma-components';
import { CourseContext, ModalContext } from '../../context';
import { AddCourse } from '../Modals';
import './style.css';

const { Tab } = Tabs;

const CourseTabs = () => {
  const [courseTabs, setCourseTabs] = useState(null);
  const { allCourses, selectedCourse, setSelectedCourse } = useContext(CourseContext);
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
      <Tabs type='boxed' id='course-tabs' className='has-background-white rounded'>
        {courseTabs}
        <Tab
          className='add-course-tab'
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
