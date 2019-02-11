const mongoose = require('mongoose')
const { positionAddSchema } = require('../schema/index.js')

const positionAddModel = mongoose.model('lagous', positionAddSchema)


module.exports = positionAddModel