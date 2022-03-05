import React, {
  createContext, useMemo, useState, useCallback,
} from 'react';

export const TASKS_SECTION = 'tasks_section';
export const STUDENTS_SECTION = 'students_section';
export const MEETINGS_SECTION = 'meetings_section';

export const DashboardContext = createContext({});

// eslint-disable-next-line react/prop-types
const DashboardProvider = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState({ component: MEETINGS_SECTION, selectedItemId: '' });
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
