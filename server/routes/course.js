const router = require('express').Router()
const { Course, Tutor } = require('../models');
const { authorizeToken } = require('../utils/auth');
const { addModelToTutor, deleteModelFromTutor, getTutorById } = require('../utils/helpers');

// create a course
router.post('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    const { courses } = await getTutorById(tutor._id)

    try {
        // check if tutor already has existing course with this name
        const matchingCourses = courses.filter(({ name }) => name === req.body.name)
        if (matchingCourses.length) return res.status(400).json('course name must be unique for user')

    } catch (error) {
        console.log(error);
        res.status(500).json('course name must be unique');
    }

    const course = await Course.create(req.body);
    if (!course) return res.statusMessage(500).json('failed to create course');

    try {
        await addModelToTutor(tutor._id, 'courses', course._id);
        // respond with updated array of courses
        res.json([...courses, course]);

    } catch (error) {
        console.log(error);
        res.status(500).json('failed to update tutor');
    };
});

// update a courses information
router.put('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    try {
        const course = await Course.findByIdAndUpdate(req.body._id, req.body);
        if (!course) return res.status(404).json('course not found');

        res.json('course updated');

    } catch (error) {
        console.log(error);
        res.status(500).json('failed to update course');
    };
});

// delete a course and remove the reference from the tutor
router.delete('/', async (req, res) => {
    const { tutor } = authorizeToken(req);
    if (!tutor) return res.status(401).json('unauthorized');

    try {
        await deleteModelFromTutor(tutor._id, "courses", Course, req.body._id);
        res.json('course deleted');

    } catch (error) {
        console.log(error);
        res.status(500).json('failed to delete course');
    };

});

module.exports = router