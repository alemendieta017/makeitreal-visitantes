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
  const allVisitors = []
  
  try {
    const user = await Visitor.find({name : req.query.name})
    if(!user) {
      const newVisitor = new Visitor({
        name : req.query.name || 'Anónimo',
        count : 1
      })
      await newVisitor.save()
     
    } else {
      console.log(user)
      const newVisitor = new Visitor({
        name : req.query.name || 'Anónimo',
        count : 999
      })
      await newVisitor.save()
    }
    allVisitors = await Visitor.find({})
  } catch (err) {
    next(err)
  }
  
  res.render('main', {visitors : allVisitors}) 
})

app.listen(3000, () => {console.log('Listening on port 3000')})