const express = require('express');
const { users } = require('./models/index');
const bcrypt = require('bcrypt');
const basicAuth = require('./middleware/basic');

const router=express.Router()

router.post('/signup',async(req,res,next)=>{

let username=req.body.username
let hashedPassword=await bcrypt.hash(req.body.password,5)
const record=await users.create({


    username:username,
    password:hashedPassword
})
res.status(201).json(record)
})


router.post('/signin',basicAuth,(req,res)=>{

   


})

module.exports=router