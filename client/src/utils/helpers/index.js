import formatMeetings from './meeting';
import formatStudents from './student';
import formatCalendlyMeetings from './calendlyMeetings';
import formatCourses from './course';
import handleError from './error';
import logoutTutor from './logout';
import preventBodyScroll from './html';
import { buildTemplatePreview, formatEmailTemplates } from './emailTemplates';

export {
  buildTemplatePreview,
  formatCalendlyMeetings,
  formatCourses,
  formatEmailTemplates,
  formatMeetings,
  formatStudents,
  handleError,
  logoutTutor,
  preventBodyScroll,
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
  convertStrToBool,
  emailIsValid,
  getTextareaRows,
  inputIsSelected,
  missingFormInputs,
  passwordIsValid,
} from './forms';
