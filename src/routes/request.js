const express= require("express");
const routes= express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../model/connectionRequest");
const { createConnection } = require("mongoose");
const User = require("../model/user");

routes.post("/request/send/:status/:toUserId",userAuth, async(req,res)=>{
try{
  const fromUserId=req.user._id;
  const toUserId=req.params.toUserId;
  const status=req.params.status;
  const connectionRequest = new ConnectionRequestModel({
    fromUserId,
    toUserId,
    status
  })
const toUser=await User.findById(toUserId);
if(!toUser){
  return res.status(400).json({message: "User not found"})
}
  const allowedStatus=["ignored","intrested"];
  if(!allowedStatus.includes(status)){
    return res.status(400).json({message: "Invalid status"})
  }

  //If there is already connection exist
  const isRequestExist= await ConnectionRequestModel.findOne({
    $or:[
      {fromUserId,toUserId},
      {fromUserId:toUserId,toUserId:fromUserId}
    ]
  })

  if(isRequestExist){
    return res.status(400).json({message:"connection already exist"})
  }
  const data=await connectionRequest.save();
  res.json({
    message:"connection request successful",
    data
  });

}catch(err){
  res.status(400).send("Error: "+ err.message);
}
})


routes.post("/request/review/:status/:requestId", userAuth, async(req,res)=>{
  try{
 const logInUser=req.user;
 const {status,requestId} =req.params;
 const allowedStatus = ["accepted","rejected"];
 if(!allowedStatus.includes(status)){
   res.status(400).json({
    message: "status not allow"
  })
}
  const connectionRequest = await ConnectionRequestModel.findOne({
    _id:requestId,
    toUserId: logInUser._id,
    status: "intrested"
  })
  if(!connectionRequest){
    return res.status(400).json({
      message:"connection request not found"
    })
  }
  connectionRequest.status=status;
  const data = await connectionRequest.save();
  return res.json({
    message: "connection request "+status,
    data
  }) 
  }catch(err){
    res.status(400).json({message: err.message});
  }
 


})


module.exports=routes;