const app = require('express').Router()
const tutorRoutes = require('./tutor')

app.use('/tutor', tutorRoutes)

module.exports = app