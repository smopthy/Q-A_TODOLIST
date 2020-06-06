const express = require('express')
const mongoose = require('momgoose')

const Schema = mongoose.Schema 

const userSchema  = new  Schema ({

        name : {
          type : String  ,
          required : true ,
        } , 
        eamil : {
          type : String , 
          required : true 
        } , 

        password :{
          type : String , 
          required : true
        } , 
        createAt : {
          type : Date , 
          default : Date.now 
        }

})

module.exports = mongoose.modle('User' , userSchema ) 