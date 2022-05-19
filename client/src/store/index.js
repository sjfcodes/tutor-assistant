// Creates a Redux store that holds the state of the app. Only one store should exist.
import { createStore, combineReducers, applyMiddleware } from 'redux';

import view from './view/reducers';
import courses from './courses/reducers';
import tutor from './tutor/reducers';
import middleware from './middleware';

export default createStore(
  combineReducers({
    courses,
    tutor,
    view,
  }),
  applyMiddleware(middleware),
);
