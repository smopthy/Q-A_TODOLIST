const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Todo = require('./model/todo')
const methodOverride = require('method-override')

require('./config/mongoose')

const app = express()

app.engine('hbs' , exphbs({defaultLayout : 'main' , extname : '.hbs'}))
app.set('view engine' , 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

// index 

app.get('/' , (req ,res)=>{ 
    // const name = req.body.name
    return Todo.find()
        .lean()
        .then(todos=>{
            res.render('index',{todos})
        })
        .catch(err=>{console.log(err)})
})

//new 

app.get('/todos/new' , (req,res)=>{
        res.render('new')

})

app.post('/todos' , (req ,res)=>{
        const name = req.body.name 
        return Todo.create({name})
            .then(() => res.redirect('/')) 
            .catch(err=>{console.log(err)})
})


//detail 

app.get('/todos/:id' , (req,res)=>{
    const id = req.params.id

    return Todo.findById(id)
        .lean()
        .then((todos) =>{
            res.render('detail' , {todos})
        })
        .catch((error)=>{console.log(error)})
})

//edit 

app.get('/todos/:id/edit' , (req,res)=>{
    const id = req.params.id
    return Todo.findById(id)
        .lean()
        .then((todos)=>{res.render('edit' , {todos})})
        .catch()
})


app.put('/todos/:id' , (req,res)=>{
    const name = req.body.name 
    const id = req.params.id
    const isDone = req.body.isDone 
        return Todo.findById(id)
            .then((todos)=>{
                 todos.name = name
                 todos.isDone = isDone === 'on'
                return todos.save()
            })
            .then(()=>{res.redirect(`/todos/${id}`)})
            .catch()
})

// delete 

app.delete('/todos/:id' , (req,res)=>{
    const id = req.params.id
        return Todo.findById(id)
            .then(todos=>{    
                todos.remove()
            })
            .then(()=>res.redirect('/'))
            .catch()
})

app.listen(3000 , ()=>{
    console.log('node connection is ok ')
})