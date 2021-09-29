const app = require('express').Router()
const tutorRoutes = require('./tutor')
const studentRoutes = require('./student')
const sessionRoutes = require('./session')
const templateRoutes = require('./template')

app.use('/tutor', tutorRoutes)
app.use('/student', studentRoutes)
app.use('/session', sessionRoutes)
app.use('/template', templateRoutes)

module.exports = app