const app = require('express').Router()
const tutorRoutes = require('./tutor')
const studentRoutes = require('./student')
const sessionRoutes = require('./session')

app.use('/tutor', tutorRoutes)
app.use('/student', studentRoutes)
app.use('/session', sessionRoutes)

module.exports = app