const express =require('express')
const router =express.Router()
const passport = require('passport')

const User  = require('../../model/user')

router.get('/login' ,(req,res)=>{

    res.render('login')

})

router.post('/login', passport.authenticate('local', {

    successRedirect: '/',
    failureRedirect: 'users/login'
}))



router.get('/register', (req, res) => {
    res.render('register')		 
  })


router.post('/register' ,(req ,res)=>{
    // const email = req.body.email
    // const name = req.body.name
    // const password  = req.body.password
    // const confirmPassword = req.body.confirmPassword
    const { name, email, password, confirmPassword } = req.body
    
    User.findOne({email})    
        .then( user =>{
                if (user) {
                    console.log('the email has been register')
                    res.render('register',{
                        name,
                        email,
                        password,
                        confirmPassword
                    })
                } else {
                    return User.create({
                        name , 
                        email , 
                        password 
                    })
                    .then(()=> res.redirect('/'))
                    .catch(err => console.log(err))
                }
        
        })

})
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/users/login')
  })

module.exports = router