const express = require('express')
const router = express.Router()

const Todo = require('../../model/todo')

//new 

router.get('/new' , (req,res)=>{
    res.render('new')
})

router.post('/' , (req ,res)=>{
    const userId = req.user._id
    const name = req.body.name 
    return Todo.create({name , userId})
        .then(() => res.redirect('/')) 
        .catch(err=>{console.log(err)})
})


//detail 

router.get('/:id' , (req,res)=>{
    const userId = req.user._id
    const _id = req.params.id

    return Todo.findOne({_id , userId})
        .lean()
        .then((todos) =>{
            res.render('detail' , {todos})
        })
        .catch((error)=>{console.log(error)})
})

//edit 

router.get('/:id/edit' , (req,res)=>{
    const userId = req.user._id
    const _id = req.params.id
    return Todo.findOne({_id , userId})
        .lean()
        .then((todos)=>{res.render('edit' , {todos})})
        .catch()
})


router.put('/:id' , (req,res)=>{
    const userId = req.user._id
    const _id = req.params.id
    const name = req.body.name 
    const isDone = req.body.isDone 
        return Todo.findOne({_id , userId})
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
        const _id = req.params.id
        const userId = req.user._id
        return Todo.findOne({ _id, userId })
            .then(todos=>{    
                todos.remove()
            })
            .then(()=>res.redirect('/'))
            .catch()
})

module.exports = router 