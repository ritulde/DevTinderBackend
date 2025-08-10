const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../model/connectionRequest");
const { status } = require("express/lib/response");
const userRouter= express.Router();

userRouter.get("/user/requests/recived",userAuth,async(req,res)=>{
    try{
        const logInUser = req.user;
        const connectionRequest=await ConnectionRequestModel.find({
            toUserId:logInUser._id,
            status:"intrested"
        }).populate("fromUserId",["firstName","lastName"]);
        res.json({
            message:"fetch data successfully",
            connectionRequest
        })
        
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
})
const User_Safe_Data = "firstName lastName age gender about skills"
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const logInUser = req.user;
        const connectionRequest= await ConnectionRequestModel.find({
            $or:[
                {toUserId:logInUser._id,status:"accepted"},
                {fromUserId:logInUser._id,status: "accepted"}
            ]
        }).populate("fromUserId",User_Safe_Data).populate("toUserId",User_Safe_Data);
        const data = connectionRequest.map(row=>{
            if(row.fromUserId._id.toString()===logInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId
        })
        res.json({
            data
        })

    }catch(err){
        res.status(400).jsosn({
            message: err.message
        })
    }
})


module.exports=userRouter;