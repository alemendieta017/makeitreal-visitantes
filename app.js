const express = require('express')
const app = express()
const {engine} = require('express-handlebars');
const Visitor = require('./db/models');

// db
require('./db/db')

//views
app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', async function (req, res, next) {
  const newVisitor = new Visitor({
    host : req.headers.host,
    date: new Date(),
    name : req.query.name || 'Anónimo'
  })
  try {
    await newVisitor.save()
    res.json(newVisitor)
  } catch (err) {
    next(err)
  }
})

app.listen(3000, () => {console.log('Listening on port 3000')})