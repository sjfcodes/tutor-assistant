const { getISOPastHour, getISOFutureHour, getISOCurrentHour } = require('../utils/dateTime');

const meetingSeeds = [
  {
    status: 'scheduled',
    notes: 'javascript ',
    startTime: getISOPastHour(1),
    duration: 1,
  },
  {
    status: 'scheduled',
    notes: '3rd party APIs',
    startTime: getISOFutureHour(2),
    duration: 1,
  },
  {
    status: 'scheduled',
    notes: 'React',
    startTime: getISOCurrentHour(),
    duration: 1,
  },
];

module.exports = meetingSeeds;
