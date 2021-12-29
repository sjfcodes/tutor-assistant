const { Error } = require('mongoose');
const { Tutor, Course } = require('../models');

module.exports = {

  getTutorById: (id) => new Promise((resolve, reject) => {
    Tutor.findById(id)
      .populate('calendly')
      .populate({
        path: 'courses',
        populate: [
          {
            path: 'students',
            model: 'Student',
          },
          {
            path: 'meetings',
            model: 'Meeting',
          },
        ],
      })
      .select('-password')
      .then((tutor) => {
        if (!tutor) return reject(new Error('tutor not found'));
        return resolve({ tutor });
      })
      .catch((error) => reject(error));
  }),

  getTutorByEmail: (email) => new Promise((resolve, reject) => {
    Tutor.findOne({ email })
      .populate('calendly')
      .populate({
        path: 'courses',
        populate: [
          {
            path: 'students',
            model: 'Student',
          },
          {
            path: 'meetings',
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
        if (!updatedTutor) return reject(new Error('failed to update tutor'));
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
      if (!updatedTutor) return reject(new Error('failed to update tutor'));
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
        if (!updatedCourse) return reject(new Error('failed to update Course'));
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
        if (!updatedCourse) return reject(new Error('failed to update Course'));
        Model.findByIdAndDelete(modelId)
          .then(() => resolve(updatedCourse))
          .catch((error) => reject(error));
        return 'success';
      })
      .catch((error) => reject(error));
  }),

  updateDocumentProperties: (allowUpdate, currentDoc, newProps) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(newProps)) {
      // eslint-disable-next-line no-continue
      if (key === 'email' && currentDoc.email === newProps.email) continue;
      // eslint-disable-next-line no-param-reassign
      if (allowUpdate[key]) currentDoc[key] = value;
    }
  },
};
