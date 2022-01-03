import handleError from './error';
import logoutTutor from './logout';
import formatMeetings from './meeting';
import formatStudents from './student';
import formatCalendlyMeetings from './calendlyMeetings';
import formatCourses from './course';
import formatEmailTemplates from './emailTemplates';

export {
  handleError,
  logoutTutor,
  formatMeetings,
  formatStudents,
  formatCalendlyMeetings,
  formatCourses,
  formatEmailTemplates,
};

export {
  getCurrentUnix,
  getISO8601TimeStamp,
  getUnixFromFormInputs,
  convertAddMeetingFormToISO8601,
  getClientTimeZone,
  getLocalDateString,
  getTimeZoneAbbreviation,
  getSortedTimeZones,
  convertDatePickerToISO8601,
  convertISO8601ToDatePicker,
  getCurrentDatePicker,
} from './dateTime';

export {
  emailIsValid,
  passwordIsValid,
  missingFormInputs,
  inputIsSelected,
  convertStrToBool,
} from './forms';
