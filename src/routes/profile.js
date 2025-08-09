const express= require("express");
const router = express.Router();
const { userAuth } = require("../middleware/auth");

router.get("/profile",userAuth,async(req,res)=>{
  try{
    const user=req.user;
  res.send(user);
  } catch(err){
    res.status(400).send("somthing wrong in getting profile: " + error.message)
  }
})

module.exports=router;