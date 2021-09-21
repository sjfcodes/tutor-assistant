const app = require('express').Router()
const userRoutes = require('./user')

app.use('/user', userRoutes)

module.exports = app