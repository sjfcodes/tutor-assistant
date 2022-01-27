import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { HomeContext, TASKS_SECTION } from '../../../views/Home/HomeProvider';

export const TasksContext = createContext({});

// eslint-disable-next-line react/prop-types
const TasksProvider = ({ children }) => {
  const { activeComponent } = useContext(HomeContext);
  const [filterOptions, setFilterOptions] = useState(['all', 'tutor', 'student', 'meeting']);
  const [filterBy, setFilterBy] = useState(filterOptions[0]);

  const value = useMemo(() => (
    {
      filterBy,
      setFilterBy,
      filterOptions,
      setFilterOptions,
      sectionName: 'Tasks',
      isActive: activeComponent === TASKS_SECTION,
    }
  ), [activeComponent, filterBy, filterOptions]);

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
