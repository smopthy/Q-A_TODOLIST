const express = require('express')

const router = express.Router()

const Todo = require('../../model/todo')

router.get('/' , (req, res)=>{
    const userId = req.user._id 
     Todo.find({userId})
        .lean()
        .then(todos=>{
            res.render('index' , {todos})
        })
        .catch((err)=>{console.log('err')})
})


module.exports = router  

