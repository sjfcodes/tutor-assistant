import React, {
  createContext, useMemo, useState, useCallback,
} from 'react';

export const COURSE_SECTION_TASKS = 'COURSE_SECTION_TASKS';
export const COURSE_SECTION_STUDENTS = 'COURSE_SECTION_STUDENTS';
export const COURSE_SECTION_MEETINGS = 'COURSE_SECTION_MEETINGS';

export const DashboardContext = createContext({});

// eslint-disable-next-line react/prop-types
const DashboardProvider = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState({ component: COURSE_SECTION_MEETINGS, selectedItemId: '' });
  const { component } = activeComponent;

  const toggleDisplayedSection = useCallback((item) => {
    setActiveComponent({
      ...activeComponent,
      component: component !== item ? item : '',
    });
  }, [component, activeComponent]);

  const value = useMemo(() => (
    {
      activeComponent,
      setActiveComponent,
      toggleDisplayedSection,
    }
  ), [activeComponent, setActiveComponent, toggleDisplayedSection]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
