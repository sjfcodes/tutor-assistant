import { LOCAL_STORAGE_KEY } from '../../config';
import { SET_TUTOR_LOGIN, SET_TUTOR_LOGOUT, UPDATE_TUTOR_DETAIL } from './actions';

const tutorDefault = {
  firstName: '',
  lastName: '',
  email: '',
  sendGrid: { accessToken: '' },
  timeZoneName: '',
  githubUsername: '',
  scheduleLink: '',
  courses: [],
  createdAt: '',
};

// eslint-disable-next-line default-param-last
const tutorReducer = (state = tutorDefault, action) => {
  switch (action.type) {
  case SET_TUTOR_LOGIN: {
    const copy = { ...action.payload };
    delete copy.courses;
    return {
      loggedIn: true,
      ...copy,
    };
  }

  case UPDATE_TUTOR_DETAIL: {
    return {
      ...state,
      ...action.payload,
    };
  }

  case SET_TUTOR_LOGOUT: {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return { loggedIn: false };
  }

  default: return state;
  }
};

export default tutorReducer;
