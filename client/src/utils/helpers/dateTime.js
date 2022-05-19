import { rawTimeZones } from '@vvo/tzdb';

export const getClientTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getTimeZoneAbbreviation = (timeZone) => {
  if (!timeZone) return '…';
  const x = rawTimeZones.find((tz) => tz.name === timeZone);
  return x.abbreviation || 'n/a';
};

/**
 * @returns {Array} timezone objects sorted by abbreviation
 */
export const getSortedTimeZones = () => rawTimeZones
  .sort(({ abbreviation: a }, { abbreviation: b }) => {
    if (a > b) return 1;
    if (a === b) return 0;
    return -1;
  });

/**
   * @returns {Number} current number of seconds since epoch
   */
export const getCurrentUnix = () => Math.floor(new Date().getTime() / 1000);

export const getUnixFromISO = (isoString) => Math.floor(new Date(isoString).getTime() / 1000);

/**
   * @param {Number} unix number of seconds since epoch, default to current time
   * @returns {String} iso8601 timestamp
   */
export const getISO8601TimeStamp = (unix = getCurrentUnix()) => new Date(unix * 1000).toISOString();

/**
 * @param {String} datePicker YYYY-MM-DD
 * @returns iso8601 timestamp
 */
export const convertDatePickerToISO8601 = (datePicker) => `${datePicker}T00:00:00.000Z`;

export const convertISO8601ToDatePicker = (iso8601) => {
  const d = new Date(iso8601);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

/**
 * @returns {String} YYYY-MM-DD of current day
 */
export const getCurrentDatePicker = () => convertISO8601ToDatePicker(getISO8601TimeStamp());

/**
 * @param {Number} hour 0-12
 * @param {String} amPm AM or PM
 * @returns {String} String representing an hour from 00-23
 * @refernce https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#examples
 */
const getZeroBasedHour = (hr, ampm) => {
  if (hr < 1 || hr > 12) throw new Error('hour must be between 1-12');
  switch (ampm.toLowerCase()) {
  case 'am': {
    if (hr === 12) return '00';//  If 12am return 00
    if (hr < 10) return `0${hr}`;// If 1-9am return 01-09
    return hr;// If 10 or 11
  }
  case 'pm': {
    if (hr === 12) return '12';//  If 12pm, return 12
    return `${hr + 12}`; // If 1-9pm return hour plus 12 to get 13-23
  }
  default:
    throw new Error('missing am/pm while attempting to get zero based hour');
  }
};

/**
 * @param {String}  date YYYY-MM-DD
 * @param {Number } hour 1-12
 * @param {String}  amPm AM or PM
 * @returns {Number} unix from form inputs
 */
export const getUnixFromFormInputs = (day, hour = 12, amPm = 'AM') => {
  //  New day object from parameters
  const d = new Date(`${day}T${getZeroBasedHour(parseInt(hour, 10), amPm)}:00:00.000Z`);
  const unix = Math.floor(d.getTime() / 1000);

  if (Number.isNaN(unix)) throw new Error('unix isNaN');

  return unix;
};

const getUnixOffsetFromTimeZoneName = (timeZoneName) => {
  // get client timezone offset in minutes (with leading minus if needed)
  const { rawOffsetInMinutes } = rawTimeZones.find((tz) => tz.name === timeZoneName);

  // return converted to seconds
  return rawOffsetInMinutes * 60;
};

export const convertAddMeetingFormToISO8601 = ({
  hour, day, amPm, timeZoneName,
}) => {
  // get meeting time as unix
  const zbh = getZeroBasedHour(parseInt(hour, 10), amPm);
  const unix = new Date(`${day}T${zbh}:00:00.000Z`).getTime() / 1000;

  // meeting time as unix
  const meetingUnix = unix - getUnixOffsetFromTimeZoneName(timeZoneName);

  // UTC meeting time as iso8601 timestamp
  return new Date(meetingUnix * 1000).toISOString();
};

export const getLocalDateString = (iso8601) => {
  const d = new Date(iso8601).toString().split(' ');
  // Ex: [ "Sun", "Dec", "19", "2021", "20:00:00", "GMT-0800", "(Pacific", "Standard", "Time)"]

  const date = `${d[0]} ${d[1]} ${d[2]}`;
  // Ex: Sun Dec 19

  const time = new Date(iso8601).toLocaleTimeString().split(':');
  // Ex: ["8","00","00 PM"]
  if (time[0].length === 1) time[0] = `0${time[0]}`;
  time[2] = time[2].substring(3);
  return `${date} @ ${time[0]}:${time[1]} ${time[2]}`;
};
