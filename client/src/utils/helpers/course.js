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
  });
  return courseObj;
};

export default formatCourses;
