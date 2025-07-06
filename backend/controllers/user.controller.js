const { json } = require("express");
const userModel = require("../models/user.model")
const userService = require("../services/user.service")
const {validationResult} = require("express-validator");

module.exports.registerUser =  async function (req,res, next) {

 const errors = validationResult(req)
 if (!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()})
 }
 const {fullname, email, password} = req.body;
 const hashPassword = await userModel.hashPassword(password);
 
  const user = await userService.createUser({
    firstname : fullname.firstname,
    lastname : fullname.lastname,
    email,
    password: hashPassword
  });

 const token =user.generateAuthToken();
 res.status(200).json({token , user})
}


module.exports.loginUser = async function (req, res, next) {
 const errors =  validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array() })
  } 
  const {email , password } = req.body
  const user =   await userModel.findOne({email}).select("+password")
  // console.log(user);
  
  if(!user){
    return res.status(401).json({massage : "invalid email or password"})
  }

  const isMatch  =  await user.comparePassword(password)
  if(!isMatch){
    return res.status(401).json({message : "invali email or password"})
  }
  const token = user.generateAuthToken();
  res.status(200).json({token , user})
}