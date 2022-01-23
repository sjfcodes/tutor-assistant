// Creates a Redux store that holds the state of the app. Only one store should exist.
import { createStore, combineReducers, applyMiddleware } from 'redux';

import tutor from './tutor/reducers';
import courses from './courses/reducers';
import calendlyMeetings from './calendly/reducers';
import middleware from './middleware';

export default createStore(
  combineReducers({
    tutor,
    courses,
    calendlyMeetings,
  }),
  applyMiddleware(middleware),
);
