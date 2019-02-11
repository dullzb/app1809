const mongoose = require('mongoose')
const { userSchema } = require('../schema/index.js')

const usersModel = mongoose.model('users', userSchema)


module.exports = usersModel