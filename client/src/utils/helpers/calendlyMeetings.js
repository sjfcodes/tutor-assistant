const formatCalendlyMeetings = (meetings) => {
  if (!Object.keys(meetings).length) return {};
  const meetingObj = {};

  const formatQAndA = (meeting) => {
    if (!Object.keys(meeting).length) return {};
    const qAndAObj = {};
    meeting.questionsAndAnswers.forEach(({ question, answer, position }) => {
      const key = `${position}-${question.split(' ').join('_')}`;
      qAndAObj[key] = answer;
    });
    return qAndAObj;
  };

  meetings.forEach((meeting) => {
    const key = meeting._id;
    const questions = formatQAndA(meeting);
    // eslint-disable-next-line no-param-reassign
    delete meeting.questionsAndAnswers;
    const values = {
      ...meeting,
      ...questions,
      type: 'calendly',
    };
    meetingObj[key] = values;
  });
  return meetingObj;
};

export default formatCalendlyMeetings;
