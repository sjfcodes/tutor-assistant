const { Error } = require('mongoose');
const { Tutor, Course } = require('../models');

module.exports = {
  getTutor: ({ _id, email }) => new Promise((resolve, reject) => {
    const getField = () => {
      if (_id) return ({ _id });
      if (email) return ({ email });
      return null;
    };
    Tutor.findOne(getField())
      .populate({
        path: 'courses',
        populate: [
          {
            path: 'students',
            model: 'Student',
          },
          {
            path: 'meetings',
            // match: { startTimeUnix: { $gte: (new Date().getTime() / 1000) } },
            model: 'Meeting',
          },
        ],
      })
      .then((tutor) => {
        if (!tutor) return reject(new Error('tutor not found'));
        return resolve({ tutor });
      })
      .catch((error) => reject(error));
  }),

  addModelToTutor: (tutorId, property, modelId) => new Promise((resolve, reject) => {
    Tutor.findByIdAndUpdate(
      tutorId,
      { $addToSet: { [property]: modelId } },
      // { new: true }
    )
      .then((updatedTutor) => {
        if (!updatedTutor) return reject(new Error('update failed'));
        return resolve(updatedTutor);
      })
      .catch((error) => reject(error));
  }),

  deleteModelFromTutor: (tutorId, property, Model, modelId) => new Promise((resolve, reject) => {
    Tutor.findByIdAndUpdate(
      tutorId,
      { $pullAll: { [property]: [modelId] } },
      // { new: true }
    ).then((updatedTutor) => {
      if (!updatedTutor) return reject(new Error('update failed'));
      Model.findByIdAndDelete(modelId)
        .then(() => resolve(updatedTutor))
        .catch((error) => reject(error));
      return 'success';
    })
      .catch((error) => reject(error));
  }),

  addModelToCourse: (courseId, property, modelId) => new Promise((resolve, reject) => {
    Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { [property]: modelId } },
      // { new: true }
    )
      .then((updatedCourse) => {
        if (!updatedCourse) return reject(new Error('update failed'));
        return resolve(updatedCourse);
      })
      .catch((error) => reject(error));
  }),

  deleteModelFromCourse: (courseId, property, Model, modelId) => new Promise((resolve, reject) => {
    Course.findByIdAndUpdate(
      courseId,
      { $pullAll: { [property]: [modelId] } },
      // { new: true }
    )
      .then((updatedCourse) => {
        if (!updatedCourse) return reject(new Error('update failed'));
        Model.findByIdAndDelete(modelId)
          .then(() => resolve(updatedCourse))
          .catch((error) => reject(error));
        return 'success';
      })
      .catch((error) => reject(error));
  }),

  allowPropertyUpdate: (allowUpdate, newProps) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key] of Object.entries(newProps)) {
      // eslint-disable-next-line no-continue
      if (key === '_id') continue;
      if (!allowUpdate[key]) return false;
    }
    return true;
  },
};
