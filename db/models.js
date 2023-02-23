const mongoose = require('mongoose')

const visitorSchema = new mongoose.Schema({
  name : String,
  date : String
})

const Visitor = mongoose.model('Visitor', visitorSchema)

module.exports = Visitor