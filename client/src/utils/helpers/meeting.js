const formatMeetings = (meetings) => {
  if (!Object.keys(meetings).length) return {};
  const meetingObj = {};
  meetings.forEach((meeting) => {
    const key = meeting._id;
    const values = { ...meeting, type: 'tutorly' };
    meetingObj[key] = values;
  });
  return meetingObj;
};

export default formatMeetings;
