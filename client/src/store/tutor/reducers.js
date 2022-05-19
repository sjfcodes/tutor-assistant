import { TUTOR_AUTH_TOKEN, removeLocalStorageData, updateLocalStorage } from '../../store_local';
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

    updateLocalStorage({ key: TUTOR_AUTH_TOKEN, value: action.payload.token });
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
    removeLocalStorageData();
    return { loggedIn: false };
  }

  default: return state;
  }
};

export default tutorReducer;
