import { formatCourses } from '../../utils';
import {
  SET_ALL_COURSES,
  SET_SELECTED_COURSE,

  ADD_COURSE,
  UPDATE_COURSE_DETAIL,
  DELETE_COURSE,

  ADD_STUDENT_TO_COURSE,
  UPDATE_STUDENT_DETAIL,
  DELETE_STUDENT,

  ADD_MEETING_TO_COURSE,
  UPDATE_MEETING_DETAIL,
  DELETE_MEETING,
  SET_CALENDLY_MEETINGS_FOR_COURSE,
} from './actions';

// eslint-disable-next-line no-console

// eslint-disable-next-line default-param-last
const courseReducer = (state = {}, { type, payload }) => {
  switch (type) {
  case SET_ALL_COURSES: {
    return {
      allCourses: formatCourses(payload),
    };
  }
  case SET_SELECTED_COURSE: {
    return {
      ...state,
      selectedCourse: payload._id,
    };
  }

  case ADD_COURSE: {
    const course = payload;
    course.students = {};
    course.meetings = {};
    const allCourses = { ...state.allCourses };

    allCourses[course._id] = course;
    return {
      ...state,
      allCourses,
    };
  }
  case UPDATE_COURSE_DETAIL: {
    const course = {
      ...state.allCourses[state.selectedCourse],
      ...payload,
    };
    const allCourses = { ...state.allCourses, [course._id]: course };
    return {
      ...state,
      allCourses,
    };
  }
  case DELETE_COURSE: {
    const _id = payload;
    const copy = { ...state.allCourses };
    delete copy[_id];

    return {
      ...state,
      allCourses: copy,
      selectedCourse: _id === state.selectedCourse
        ? null
        : state.selectedCourse,
    };
  }

  case ADD_STUDENT_TO_COURSE: {
    const student = payload;
    const allCourses = { ...state.allCourses };
    allCourses[state.selectedCourse].students[student._id] = student;

    return {
      ...state,
      allCourses,
    };
  }

  case UPDATE_STUDENT_DETAIL: {
    const student = payload;
    const allCourses = { ...state.allCourses };
    allCourses[state.selectedCourse].students[student._id] = student;

    return {
      ...state,
      allCourses,
    };
  }
  case DELETE_STUDENT: {
    const _id = payload;
    const allCourses = { ...state.allCourses };
    delete allCourses[state.selectedCourse].students[_id];

    return {
      ...state,
      allCourses,
    };
  }
  case ADD_MEETING_TO_COURSE: {
    const meeting = payload;
    const allCourses = { ...state.allCourses };
    allCourses[state.selectedCourse].meetings[meeting._id] = meeting;

    const meetingCount = allCourses[state.selectedCourse].meetingCount + 1;

    return {
      ...state,
      allCourses,
      meetingCount,
    };
  }

  case UPDATE_MEETING_DETAIL: {
    const meeting = payload;
    const allCourses = { ...state.allCourses };
    allCourses[state.selectedCourse].meetings[meeting._id] = meeting;

    return {
      ...state,
      allCourses,
    };
  }
  case DELETE_MEETING: {
    const _id = payload;
    const allCourses = { ...state.allCourses };
    delete allCourses[state.selectedCourse].meetings[_id];

    return {
      ...state,
      allCourses,
    };
  }

  case SET_CALENDLY_MEETINGS_FOR_COURSE: {
    const { selectedCourse, calendlyMeetings } = payload;
    const allCourses = { ...state.allCourses };
    const mergedMeetings = { ...allCourses[selectedCourse].meetings, ...calendlyMeetings };
    allCourses[selectedCourse].meetings = mergedMeetings;
    console.log(allCourses);

    return {
      ...state,
      // allCourses,
    };
  }

  default: return state;
  }
};

export default courseReducer;
