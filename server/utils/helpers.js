const { Tutor, Course } = require('../models');

module.exports = {
    getTutorById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const tutor = await Tutor.findById(id)
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
                            }
                        ]
                    })
                    .select('-password')
                if (!tutor) return reject('tutor not found');

                resolve({ tutor });

            } catch (error) {
                reject(error);
            };
        });
    },
    getTutorByEmail: (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                const tutor = await Tutor.findOne({ email: email })
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
                            }
                        ]
                    })
                if (!tutor) return reject('tutor not found');

                resolve({ tutor });

            } catch (error) {
                reject(error);
            };
        });
    },
    addModelToTutor: (tutorId, property, modelId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedTutor = await Tutor.findByIdAndUpdate(
                    tutorId,
                    { $addToSet: { [property]: modelId } },
                    // { new: true }
                );
                if (!updatedTutor) return reject('failed to update tutor');
                resolve(updatedTutor);
            } catch (error) {
                reject(error);
            };
        });
    },
    deleteModelFromTutor: (tutorId, property, Model, modelId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedTutor = await Tutor.findByIdAndUpdate(tutorId,
                    { $pullAll: { [property]: [modelId] } },
                    // { new: true }
                );
                if (!updatedTutor) return reject('failed to update tutor');
                await Model.findByIdAndDelete(modelId);
                resolve(updatedTutor);
            } catch (error) {
                reject(error);
            };
        });
    },
    addModelToCourse: (courseId, property, modelId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedCourse = await Course.findByIdAndUpdate(
                    courseId,
                    { $addToSet: { [property]: modelId } },
                    // { new: true }
                );
                if (!updatedCourse) return reject('failed to update Course');
                resolve(updatedCourse);
            } catch (error) {
                reject(error);
            };
        });
    },
    deleteModelFromCourse: (courseId, property, Model, modelId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedCourse = await Course.findByIdAndUpdate(courseId,
                    { $pullAll: { [property]: [modelId] } },
                    // { new: true }
                );
                if (!updatedCourse) return reject('failed to update Course');
                await Model.findByIdAndDelete(modelId);
                resolve(updatedCourse);
            } catch (error) {
                reject(error);
            };
        });
    },
    updateDocumentProperties: (allowUpdate, currentDoc, newProps) => {
        for (const [key, value] of Object.entries(newProps)) {
            if (key === 'email' && currentDoc.email === newProps.email) continue;
            if (allowUpdate[key]) currentDoc[key] = value;
        };
    }
};