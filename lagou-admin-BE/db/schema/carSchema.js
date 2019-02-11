const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    shopName: String
})

module.exports = carSchema