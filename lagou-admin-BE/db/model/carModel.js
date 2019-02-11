const mongoose = require('mongoose')
const { carSchema } = require('../schema/index.js')

const carModel = mongoose.model('car', carSchema)


module.exports = carModel