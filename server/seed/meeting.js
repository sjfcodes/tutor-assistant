// 86400 seconds in a day
// 3600 sedonds in an hour

const getUnixCurrentHour = () => {
  const currUnixTime = Math.floor(Date.now() / 1000);
  const currUnixHour = currUnixTime - (currUnixTime % 3600);
  return currUnixHour;
};
const getUnixPastHour = (x) => getUnixCurrentHour() - 3600 * (x);
const getUnixFutureHour = (x) => getUnixCurrentHour() + 3600 * (x);

const meetingSeeds = [
  {
    _id: '61bc17bd9d98682321c8d478',
    status: 'scheduled',
    studentId: '61bc1de5afe0e50f52099a85',
    duration: 1,
    startDate: getUnixPastHour(1),
  },
  {
    _id: '61bc17bd9d98682321c8d479',
    status: 'scheduled',
    studentId: '61bc17044b5faaa82f1e5691',
    duration: 1,
    startDate: getUnixCurrentHour(),
  },
  {
    _id: '61bc17bd9d98682321c8d480',
    status: 'scheduled',
    studentId: '61bc1de5afe0e50f52099a85',
    duration: 1,
    startDate: getUnixFutureHour(1),
  },
  {
    _id: '61bc17bd9d98682321c8d481',
    status: 'scheduled',
    studentId: '61bc17044b5faaa82f1e5691',
    duration: 1,
    startDate: getUnixFutureHour(2),

  },
];

module.exports = meetingSeeds;
