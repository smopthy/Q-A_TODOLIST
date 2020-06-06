const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')
const Todo = require('./model/todo')
const methodOverride = require('method-override')


require('./config/mongoose')
const routes = require('./routes')
const app = express()

app.engine('hbs' , exphbs({defaultLayout : 'main' , extname : '.hbs'}))
app.set('view engine' , 'hbs')

app.use(session({
    secret : 'thisismySecret' ,
    resave: false , 
    saveUninitialized : true 
}))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

usePassport(app)

app.use((req, res, next) => {
    // 你可以在這裡 console.log(req.user) 等資訊來觀察
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    next()
  })

app.use(routes)



app.listen(3000 , ()=>{
    console.log('node connection is ok ')
})