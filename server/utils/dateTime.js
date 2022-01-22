//      1 * 1,000 =     1,000 milliseconds in 1 second
//     60 * 1,000 =    60,000 milliseconds in 1 minute
//  3,600 * 1,000 = 3,600,000 milliseconds in 1 hour

const getISOCurrentDateStamp = () => new Date().toISOString();
const getCurrentHour = () => {
  const currTime = Math.floor(Date.now());
  const currHour = currTime - (currTime % 3600000);
  return currHour;
};
const getISOCurrentHour = () => new Date(getCurrentHour()).toISOString();
const getISOPastHour = (x) => {
  if (!x) return getISOCurrentHour();
  return new Date(getCurrentHour() - 3600000 * (x)).toISOString();
};
const getISOFutureHour = (x) => {
  if (!x) return getISOCurrentHour();
  return new Date(getCurrentHour() + 3600000 * (x)).toISOString();
};

const calculateEndTime = ({ startTime, duration }) => {
  const startUnix = new Date(startTime).getTime() / 1000;
  const endUnix = startUnix + (duration * 3600);
  return new Date(endUnix * 1000).toISOString();
};

/**
 * convert a date string format
 * @param {String} gradDate
 * date pattern expected to be
 *      MM/DD/YYYY || M/D/YYYY
 * @returns
 * ISO8601 string (YYYY-MM-DDT00:00:00.000Z)
 */
const getGraduationISOString = (gradDate) => {
  const date = gradDate.split('/').map((x) => (x.length !== 1 ? x : `0${x}`));
  if (date.length !== 3) return new Date().toISOString();
  return `${date[2]}-${date[0]}-${date[1]}T00:00:00.000Z`;
};

module.exports = {
  calculateEndTime,
  getISOCurrentDateStamp,
  getISOPastHour,
  getISOCurrentHour,
  getISOFutureHour,
  getGraduationISOString,
};
