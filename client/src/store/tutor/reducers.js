import { LOCAL_STORAGE_KEY } from '../../config';
import { LOGIN_TUTOR, LOGOUT_TUTOR, UPDATE_TUTOR_DETAIL } from './actions';

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
  case LOGIN_TUTOR: {
    const tutorWithoutCourses = { ...action.payload.tutor };
    delete tutorWithoutCourses.courses;

    localStorage.setItem(LOCAL_STORAGE_KEY, action.payload.token);
    return {
      loggedIn: true,
      ...tutorWithoutCourses,
    };
  }

  case UPDATE_TUTOR_DETAIL: {
    return {
      ...state,
      ...action.payload,
    };
  }

  case LOGOUT_TUTOR: {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return { loggedIn: false };
  }

  default: return state;
  }
};

export default tutorReducer;
