const mongoose = require('mongoose')

const positionAddSchema = new mongoose.Schema(
  {
    companyLogo: String,
    companyName: String,
    city: String,
    positionName: String,
    salary: String,
    degree: String,
    experience: String,
    description: String,
  }
)

module.exports = positionAddSchema