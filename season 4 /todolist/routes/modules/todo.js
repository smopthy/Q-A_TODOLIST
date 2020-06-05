const express = require('express')
const router = express.Router()

const Todo = require('../../model/todo')

//new 

router.get('/new' , (req,res)=>{
    res.render('new')
})

router.post('/' , (req ,res)=>{
    const name = req.body.name 
    return Todo.create({name})
        .then(() => res.redirect('/')) 
        .catch(err=>{console.log(err)})
})


//detail 

router.get('/:id' , (req,res)=>{
    const id = req.params.id

    return Todo.findById(id)
        .lean()
        .then((todos) =>{
            res.render('detail' , {todos})
        })
        .catch((error)=>{console.log(error)})
})

//edit 

router.get('/:id/edit' , (req,res)=>{
    const id = req.params.id
    return Todo.findById(id)
        .lean()
        .then((todos)=>{res.render('edit' , {todos})})
        .catch()
})


router.put('/:id' , (req,res)=>{
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

router.delete('/:id' , (req,res)=>{
const id = req.params.id
    return Todo.findById(id)
        .then(todos=>{    
            todos.remove()
        })
        .then(()=>res.redirect('/'))
        .catch()
})

module.exports = router 