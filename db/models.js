const mongoose = require('mongoose')

const visitorSchema = new mongoose.Schema({
  name : {type: String},
  date : {type: Date, default : Date.now},
  count : {type: Number}
})

const Visitor = mongoose.model('Visitor', visitorSchema)

module.exports = Visitor