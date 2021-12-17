import handleError from './error';
import logoutTutor from './logout';
import formatMeetings from './meeting';
import formatStudents from './student';
import formatCourses from './course';

export {
  handleError,
  logoutTutor,
  formatMeetings,
  formatStudents,
  formatCourses,
};

export {
  getCurrentUnix,
  getTimeStamp,
  getUnixFromFormInputs,
  getLocalDateString,
} from './dateTime';

export {
  emailIsValid,
  passwordIsValid,
  missingFormInputs,
  inputIsSelected,
} from './forms';
