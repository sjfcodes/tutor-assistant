import React, {
  createContext, useMemo, useState, useCallback,
} from 'react';

export const TASKS_SECTION = 'tasks_section';
export const STUDENTS_SECTION = 'students_section';
export const MEETINGS_SECTION = 'meetings_section';
export const DashboardContext = createContext({});

// eslint-disable-next-line react/prop-types
const DashboardProvider = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState(MEETINGS_SECTION);

  const toggleDisplayedSection = useCallback((item) => {
    setActiveComponent(
      activeComponent !== item
        ? item
        : '',
    );
  }, [activeComponent]);

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
