const express = require("express");
const app = express(); //instance of express
const connetDB = require("./config/dtabase");
const { userAuth } = require("./middleware/auth");
const User = require("./model/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser())


app.post("/signup", async (req, res) => {
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

//login api
app.post("/login", async(req,res)=>{
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
      res.send("login successful");
    }else{
      throw new Error("Password not valid")
    }
  }catch(err){
    res.status(400).send("Somthing wrong: "+ err.message);
  }
})

//get profile
app.get("/profile",userAuth,async(req,res)=>{
  try{
    const user=req.user;
  res.send(user);
  } catch(err){
    res.status(400).send("somthing wrong in getting profile: " + error.message)
  }
})


//sent connection request
app.post("/sendConnection",userAuth, async(req,res)=>{
  const user=req.user;
  res.send(user.firstName+" sent connection request")
})

connetDB()
  .then(() => {
    console.log("database connected");
    app.listen(3000, () => {
      console.log("server successfully listen onport 3000");
    });
  })
  .catch((err) => {
    console.log("database not connected");
  });
