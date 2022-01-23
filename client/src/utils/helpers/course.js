import formatMeetings from './meeting';
import formatStudents from './student';

/**
 *
 * @param {Array} courses
 * @returns
 */
const formatCourses = (courses) => {
  if (!courses.length) return {};

  const courseObj = {};
  courses.forEach((course) => {
    const key = course._id;
    const values = { ...course };
    delete values.tutorId;
    courseObj[key] = values;
    courseObj[key].students = formatStudents(course.students);
    courseObj[key].meetings = formatMeetings(course.meetings);
  });
  return courseObj;
};

export default formatCourses;
