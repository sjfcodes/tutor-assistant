export const formatStudents = (students) => {
  if (!students.length) {
    return {};
  }
  const studentObj = {};

  students.forEach((student) => {
    const key = student._id,
      values = { ...student };

    studentObj[key] = values;
  });
  return studentObj;
};
