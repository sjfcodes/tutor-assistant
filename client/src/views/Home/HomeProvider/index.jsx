import React, {
  createContext, useMemo, useState, useCallback,
} from 'react';

export const TASKS_SECTION = 'tasks_section';
export const STUDENTS_SECTION = 'students_section';
export const MEETINGS_SECTION = 'meetings_section';
export const HomeContext = createContext({});

// eslint-disable-next-line react/prop-types
const HomeProvider = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState(MEETINGS_SECTION);

  const handleActivate = useCallback((item) => {
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
      handleActivate,
    }
  ), [activeComponent, setActiveComponent, handleActivate]);

  return (
    <HomeContext.Provider value={value}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
