const mongoose = require('mongoose')

const Schema =  mongoose.Schema    
const todoScheme = new Schema ({
        name : {
            type : String , 
            required : true
        } ,
        isDone:{
            type:Boolean , 
            default : false           
        } ,
        userId: {  // 加入關聯設定
            type: Schema.Types.ObjectId,
            ref: 'User',
            index: true,
            required: true
          }

    })


module.exports = mongoose.model('Todo' , todoScheme )
