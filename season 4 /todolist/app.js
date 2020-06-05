const express = require('express')
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')
const Todo = require('./model/todo')
const methodOverride = require('method-override')

require('./config/mongoose')
const routes = require('./routes')
const app = express()

app.engine('hbs' , exphbs({defaultLayout : 'main' , extname : '.hbs'}))
app.set('view engine' , 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))
app.use(routes)



app.listen(3000 , ()=>{
    console.log('node connection is ok ')
})