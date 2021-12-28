import { rawTimeZones } from '@vvo/tzdb';

const getTimeZoneAbbreviation = (timeZone) => {
  if (!timeZone) return '…';
  const { abbreviation } = rawTimeZones.find((tz) => tz.name === timeZone) || {};
  return abbreviation;
};

const getSortedTimeZones = () => rawTimeZones
  .sort(({ abbreviation: a }, { abbreviation: b }) => {
    if (a > b) return 1;
    if (a === b) return 0;
    return -1;
  });

/**
   * @returns {Number} unix time
   */
const getCurrentUnix = () => Math.floor(new Date().getTime() / 1000);

/**
   * @param {Number} unix number of seconds sincs unix epoch, defaults to current unix time
   * @returns {String} timestamp formatted to users Local timeZoneName
   */
const getISO8601TimeStamp = (unix = getCurrentUnix()) => new Date(unix * 1000).toISOString();

const convertDatePickerToISO8601 = (datePicker) => `${datePicker}T00:00:00.000Z`;

const convertISO8601ToDatePicker = (iso8601) => {
  const d = new Date(iso8601);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

const getCurrentDatePicker = () => convertISO8601ToDatePicker(getISO8601TimeStamp());

/**
 * @param {Number} hour
 * @param {String} amPm
 * @returns {String} String representing an hour from 00-23
 * @refernce https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#examples
 */
const getZeroBasedHour = (hr, ampm) => {
  switch (ampm.toLowerCase()) {
  case 'am': {
    //  If 12AM return 00
    if (hr === 12) return '00';
    // If 1-9 return 01-09
    if (hr < 10) return `0${hr}`;
    // If 10 or 11
    return hr;
  }
  case 'pm': {
    //  If 12PM return 12
    if (hr === 12) return '12';
    // If 1-9 return hour plus 12 to get 13-23
    return `${hr + 12}`;
  }
  default:
    throw new Error('missing ampm while attempting to get zero based number');
  }
};

/**
 * @param {String}  date a date in YYYY-MM-DD format
 * @param {Number } hour number from 1-12
 * @param {String}  amPm value of either AM or PM
 * @returns {Number} unix time from form input selection
 */
const getUnixFromFormInputs = (day, hour = 12, amPm = 'AM') => {
  //  New day object from parameters
  const d = new Date(`${day}T${getZeroBasedHour(parseInt(hour, 10), amPm)}:00:00.000Z`);
  const unix = Math.floor(d.getTime() / 1000);

  if (Number.isNaN(unix)) throw new Error('unix isNaN');

  return unix;
};

const convertAddMeetingFormToISO8601 = ({
  hour, day, amPm, timeZoneName,
}) => {
  // get meeting time as unix
  const zbh = getZeroBasedHour(parseInt(hour, 10), amPm);
  const unix = new Date(`${day}T${zbh}:00:00.000Z`).getTime() / 1000;

  // get client timezone offset in minutes (with leading minus if needed)
  const { rawOffsetInMinutes } = rawTimeZones.find((tz) => tz.name === timeZoneName);
  // client timezone offset converted to unix
  const offsetInSeconds = rawOffsetInMinutes * 60;

  // time in unix
  const meetingUnix = unix - offsetInSeconds;
  console.log(meetingUnix);

  // UTC meeting time as iso8601 timestamp
  return new Date(meetingUnix * 1000).toISOString();
};

const getLocalDateString = (iso8601) => {
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

export {
  getCurrentUnix, getISO8601TimeStamp, getUnixFromFormInputs,
  getZeroBasedHour, getLocalDateString, convertAddMeetingFormToISO8601,
  getTimeZoneAbbreviation, getSortedTimeZones, convertDatePickerToISO8601,
  convertISO8601ToDatePicker, getCurrentDatePicker,
};
