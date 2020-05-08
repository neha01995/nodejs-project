const User = require('../models/User');
const bycrypt = require('bcryptjs');
const express= require('express');

const router=express.Router();

// Login page
router.get('/login' ,(req,res) => res.render("Login"));

// register page
router.get('/register' ,(req,res) => res.render("Register"));

// register Handle
router.post('/register',(req,res) => {
    const { name, email, password , password2} =req.body;
    let errors =[];

    // check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg:" Please fill all these fields"});
    }
    // if password does not match
    if(password != password2){
        errors.push({msg:" Password do not match"});
    }
    if(password.length<6){
        errors.push({msg:" Password should be atleast 6 length"});
    }

    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        User.findOne({email:email})
        .then( user =>{
            if(user){
                // User exists
                errors.push({msg:"email already exists"});
                
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                }); 
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                });
              // hash Password
              bycrypt.genSalt(10,(err,salt)=>
              bycrypt.hash(newUser.password , salt, (err,hash)=>{
                  if(err) throw err;
                  //set password to hashed
                  newUser.password = hash;
                  //save user
                  newUser.save()
                  .then(user =>{
                      res.redirect('/users/login');
                  })
                  .catch(err => console.log(err));
              })
              )
            }
        });
        
    }

});



module.exports=router;