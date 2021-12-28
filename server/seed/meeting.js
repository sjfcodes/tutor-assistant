const { getISOPastHour, getISOFutureHour, getISOCurrentHour } = require('../utils/dateTime');

const meetingSeeds = [
  {
    _id: '61bc17bd9d98682321c8d478',
    status: 'scheduled',
    studentId: '61bc1de5afe0e50f52099a85',
    notes: 'html & css',
    startTime: getISOPastHour(3),
    endTime: getISOPastHour(2),
  },
  {
    _id: '61bc17bd9d98682321c8d477',
    status: 'scheduled',
    studentId: '61bc1de5afe0e50f52099a85',
    notes: 'javascript ',
    startTime: getISOPastHour(1),
    endTime: getISOCurrentHour(),
  },
  {
    _id: '61bc17bd9d98682321c8d479',
    status: 'scheduled',
    studentId: '61bc17044b5faaa82f1e5691',
    notes: '3rd party APIs',
    startTime: getISOFutureHour(2),
    endTime: getISOFutureHour(3),
  },
  {
    _id: '61bc17bd9d98682321c8d480',
    status: 'scheduled',
    studentId: '61bc1de5afe0e50f52099a85',
    notes: 'MERN',
    startTime: getISOFutureHour(1),
    endTime: getISOFutureHour(2),
  },
  {
    _id: '61bc17bd9d98682321c8d481',
    status: 'scheduled',
    studentId: '61bc17044b5faaa82f1e5691',
    notes: 'React',
    startTime: getISOCurrentHour(),
    endTime: getISOFutureHour(1),
  },
];

module.exports = meetingSeeds;
