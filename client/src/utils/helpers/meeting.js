export const formatMeetings = (meetings) => {
    if (!meetings.length) return {}
    const meetingObj = {}

    meetings.forEach(meeting => {
        const key = meeting._id
        const values = { ...meeting }
        delete values.tutorId

        meetingObj[key] = values
    });
    return meetingObj
}