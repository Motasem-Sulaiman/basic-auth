const {users}=require('../models/index')
const bcrypt = require('bcrypt');
const base64=require('base-64')

async function basicAuth(req,res,next){
if(req.headers.authorization){
let headersParts=req.headers.authorization.split(" ")
let encodedValue=headersParts.pop();
let decodedValue=base64.decode(encodedValue)
let [username,password]=decodedValue.split(":")
const user=await users.findOne({where:{username:username}})
const validUser= await bcrypt.compare(password,user.password)

if(validUser){

   res.status(201).json({user})
   next()

}else{

    res.status(500).send("wrong username or password")
}

}else {

    console.log("no username or pass")
}
}


module.exports = basicAuth;