const router = require('express').Router();
const tutorRoutes = require('./tutor');
const studentRoutes = require('./student');
const meetingRoutes = require('./meeting');
const emailTemplateRoutes = require('./emailTemplate');
const courseRoutes = require('./course');

router.use('/tutor', tutorRoutes);
router.use('/student', studentRoutes);
router.use('/meeting', meetingRoutes);
router.use('/template', emailTemplateRoutes);
router.use('/course', courseRoutes);

module.exports = router;
