const express= require("express");
const router= express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../model/user");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    //validate data
    validateSignUpData(req);
//create has of password
    const passwordHash = await bcrypt.hash(req.body.password,10);
    //create new instance of userModel 
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email:req.body.email,
      password: passwordHash
    });

    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

router.post("/login", async(req,res)=>{
  try{
    const {email,password}=req.body;
    const user = await User.findOne({email:email});
    if(!user){
      throw new Error("Email not present in DB")
    }
    const isPasswordValid= await user.validatePassword(password);
    if(isPasswordValid){
      const jwtToken=await user.getJWT();
      res.cookie("token",jwtToken,{expires:new Date(Date.now()+8*3600000)});
      res.send(user);
    }else{
      throw new Error("Password not valid")
    }
  }catch(err){
    res.status(400).send("Somthing wrong: "+ err.message);
  }
})


router.post("/logout", async(req,res)=>{
  res.cookie("token",null,{
    expires: new Date(Date.now())
  })
  res.send("successfully logout");
})

module.exports=router;