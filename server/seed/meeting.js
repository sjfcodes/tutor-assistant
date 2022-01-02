const { getISOPastHour, getISOFutureHour, getISOCurrentHour } = require('../utils/dateTime');

const meetingSeeds = [
  {
    status: 'scheduled',
    notes: 'html & css',
    startTime: getISOPastHour(3),
    endTime: getISOPastHour(2),
  },
  {
    status: 'scheduled',
    notes: 'javascript ',
    startTime: getISOPastHour(1),
    endTime: getISOCurrentHour(),
  },
  {
    status: 'scheduled',
    notes: '3rd party APIs',
    startTime: getISOFutureHour(2),
    endTime: getISOFutureHour(3),
  },
  {
    status: 'scheduled',
    notes: 'MERN',
    startTime: getISOFutureHour(1),
    endTime: getISOFutureHour(2),
  },
  {
    status: 'scheduled',
    notes: 'React',
    startTime: getISOCurrentHour(),
    endTime: getISOFutureHour(1),
  },
];

module.exports = meetingSeeds;
