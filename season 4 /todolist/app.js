const express = require('express')
const app = express()

const exphb = require('express-handlebars')

app.engine('hbs' , exphb:{ })
app.set()

// 
app.get('/' , (req , res) =>{
        res.render('index')
})

// detail 
// app.get('/todos/:id' , (req , res)=>{

// })


app.listen(3000 , ()=>{
    console.log('connect success!')
})