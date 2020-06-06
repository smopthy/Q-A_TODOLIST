const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todolist' ,{ useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true }) 

const db = mongoose.connection

db.on('error' ,()=>{
    console.log('err')
})

db.once('open' , ()=>{
    console.log('mongo is ok')
})


module.exports = db 