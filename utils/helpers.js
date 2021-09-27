const { Tutor, Student, Session } = require('../models')

module.exports = {
    getTutorById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const tutor = await Tutor.findById(id)
                    .populate('students')
                    .populate('sessions');
                if (!tutor) reject('tutor not found')
                resolve(tutor)
            } catch (error) {
                reject(error)
            }
        })
    },
    getTutorByEmail: (email) => {
        return new Promise(async (resolve, reject) => {
            try {
                const tutor = await Tutor.findOne({ email: email })
                    .populate('students')
                    .populate('sessions');
                if (!tutor) reject('tutor not found')
                resolve(tutor)
            } catch (error) {
                reject(error)
            }
        })
    },
    updateDocumentProerties: (allowUpdate, currentDoc, newProps) => {
        for (const [key, value] of Object.entries(newProps)) {
            if (key === 'email' && currentDoc.email === newProps.email) continue
            if (allowUpdate[key]) currentDoc[key] = value
        }
    },
    addStudentToTutor: (tutorId, student) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedTutor = await Tutor.findOneAndUpdate({ _id: tutorId },
                    {
                        $addToSet: {
                            students: student._id
                        }
                    }
                );
                if (!updatedTutor) reject('tutor not updated')
                resolve(updatedTutor)
            } catch (error) {
                reject(error)
            }
        })
    }
}