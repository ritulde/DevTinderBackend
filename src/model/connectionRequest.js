const mongoose=require("mongoose");
const connectionRequestSchama= mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        reduired:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type: String,
        enum:{
            values:["ignored","intrested","rejected","accepted"],
            message: `{VALUE} is not a correct status`
        },
        required:true
    }

,},{
    timestamps: true
})

connectionRequestSchama.index({fromUserId:1,toUserId:1});   
//before save this middlewire call
connectionRequestSchama.pre("save",  function(next){
    const connectionRequest= this;
    //check fromUserId equal toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You can't send request yourself")
    }
    next();

})

const ConnectionRequestModel=new mongoose.model("connectionRequest",connectionRequestSchama);
module.exports=ConnectionRequestModel;