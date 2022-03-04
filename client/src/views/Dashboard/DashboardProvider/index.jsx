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

  const handleToggle = useCallback((item) => {
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
      handleToggle,
    }
  ), [activeComponent, setActiveComponent, handleToggle]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
