const mongoose = require('mongoose')
const Visitors = require('mongoose')

const DB_URI = process.env.MONGODB_URL

mongoose.set('strictQuery', true)

mongoose.connect(DB_URI, {useNewUrlParser : true}).catch((err) => console.log(err))