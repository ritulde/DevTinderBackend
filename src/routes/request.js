const express= require("express");
const routes= express.Router();
const { userAuth } = require("../middleware/auth");

routes.post("/sendConnection",userAuth, async(req,res)=>{
  const user=req.user;
  res.send(user.firstName+" sent connection request")
})


module.exports=routes;