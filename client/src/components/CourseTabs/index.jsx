import { string } from 'prop-types';
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { Tabs } from 'react-bulma-components';
import { CourseContext, ModalContext } from '../../context';
import './style.css';

const { Tab } = Tabs;

const CourseTabs = ({ className }) => {
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
    let i = 0;
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
          <strong className={selectedCourse !== _id ? 'has-text-grey-lighter' : ''}>
            {name}
          </strong>
        </Tab>,
      );
      if (!selectedCourse && i === 0) setSelectedCourse(_id);
      i += 1;
    });

    setCourseTabs(arr);
  }, [allCourses, handleUpdate, selectedCourse, setSelectedCourse]);

  return (
    <Tabs
      align='left'
      type='boxed'
      id='course-tabs'
      className={className}
    >
      {courseTabs}
      <Tab onClick={() => setOpenModal('addCourse')}>
        <strong className='has-text-grey-lighter'>Add Course</strong>
      </Tab>
    </Tabs>
  );
};
export default CourseTabs;

CourseTabs.propTypes = {
  className: string,
};

CourseTabs.defaultProps = {
  className: '',
};
