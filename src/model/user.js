const mongoose = require("mongoose");
const validator= require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength:4
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email not valid");
      }
    }
  },
  password: {
    type: String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Give Strong Password")
      }
    }
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enam:{
      values:["male","female","others"],
      message: `{VALUE} is not a correct gender`
    }
    // validate(value){
    //   if(!["Male","Female","Other"].includes(value)){
    //     throw new Error("Gender not valid");
    //   }
    // }
  },
  photoUrl:{
    type: String,
    default: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
  },
  about: {
    type: String,
    default: "India"
  },
  skills:{
    type:[String]
  },
},{
  timestamps: true
});

userSchema.methods.getJWT= async function(){
  const user= this;
  const token=await jwt.sign({_id:user._id},"DevTinder@790",{expiresIn:'1h'})
  return token;
}

userSchema.methods.validatePassword= async function(password){
  const user=this;
  const passwordHash= user.password;
  const isPasswordValid= await bcrypt.compare(password,passwordHash);
  return isPasswordValid;
}

 module.exports = mongoose.model("User", userSchema);
