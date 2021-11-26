const app = require('express').Router()
const tutorRoutes = require('./tutor')
const studentRoutes = require('./student')
const meetingRoutes = require('./meeting')
const templateRoutes = require('./template')

app.use('/tutor', tutorRoutes)
app.use('/student', studentRoutes)
app.use('/meeting', meetingRoutes)
app.use('/template', templateRoutes)

module.exports = app