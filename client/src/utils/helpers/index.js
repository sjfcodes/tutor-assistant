export { logoutTutor } from './logout'
export {
    validateEmail,
    validatePassword,
    validateFormInputs,
    validateSelect
} from './forms'



export const formatCourses = (courses) => {
    if (!courses.length) return null
    const courseObj = {}

    courses.forEach(course => {
        const key = course._id
        const values = { ...course }
        delete values.tutor_id

        courseObj[key] = values
    });
    return courseObj
}

export const formatStudents = (students) => {
    if (!students.length) return null
    const studentObj = {}

    students.forEach(student => {
        const key = student._id
        const values = { ...student }

        studentObj[key] = values
    });
    return studentObj
}