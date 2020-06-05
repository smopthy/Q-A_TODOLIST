const express = require('express')

const router = express.Router()

const Todo = require('../../model/todo')

router.get('/' , (req, res)=>{
     Todo.find()
        .lean()
        .then(todos=>{
            res.render('index' , {todos})
        })
        .catch((err)=>{console.log('err')})
})


module.exports = router  

