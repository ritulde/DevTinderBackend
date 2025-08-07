const mongoose = require("mongoose");
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
    trim: true
  },
  password: {
    type: String,
    required:true
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    validate(value){
      if(!["Male","Female","Other"].includes(value)){
        throw new Error("Gender not valid");
      }
    }
  },
  photos:{
    type: String,
    default: "https://www.freepik.com/free-psd/yellow-gift-with-golden-ribbon-icon-sign-symbol-3d-background-illustration_71292021.htm#fromView=keyword&page=1&position=0&uuid=8a2735e3-4155-42f6-af74-d403c8ddf067&query=Png"
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
 module.exports = mongoose.model("User", userSchema);
