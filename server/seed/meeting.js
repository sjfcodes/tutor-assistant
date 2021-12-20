const { getISOPastHour, getISOFutureHour, getISOCurrentHour } = require('../utils/dateTime');

const meetingSeeds = [
  {
    _id: '61bc17bd9d98682321c8d478',
    status: 'scheduled',
    studentId: '61bc1de5afe0e50f52099a85',
    duration: 2,
    notes: 'html & css',
    startDate: getISOPastHour(3),
  },
  {
    _id: '61bc17bd9d98682321c8d477',
    status: 'scheduled',
    studentId: '61bc1de5afe0e50f52099a85',
    duration: 1,
    notes: 'javascript ',
    startDate: getISOPastHour(1),
  },
  {
    _id: '61bc17bd9d98682321c8d479',
    status: 'scheduled',
    studentId: '61bc17044b5faaa82f1e5691',
    duration: 2,
    notes: '3rd party APIs',
    startDate: getISOFutureHour(2),

  },
  {
    _id: '61bc17bd9d98682321c8d480',
    status: 'scheduled',
    studentId: '61bc1de5afe0e50f52099a85',
    duration: 1,
    notes: 'MERN',
    startDate: getISOFutureHour(1),
  },
  {
    _id: '61bc17bd9d98682321c8d481',
    status: 'scheduled',
    studentId: '61bc17044b5faaa82f1e5691',
    duration: 2,
    notes: 'React',
    startDate: getISOCurrentHour(),
  },
];

module.exports = meetingSeeds;
