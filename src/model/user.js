const mongoose = require("mongoose");
const validator= require("validator");
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
