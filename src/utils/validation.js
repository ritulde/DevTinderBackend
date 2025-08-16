const validator = require("validator");
const validateSignUpData=(req)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("Name not valid")
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email not valid")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password not strong");
    }
}
const validateProfileData= (req)=>{
    const allowedEditFields=["firstName","lastName","email",,"age","gender","photoUrl","about","skills"];
    const isEditAllow=Object.keys(req.body).every((field)=>allowedEditFields.includes(field));
    return isEditAllow;
}
module.exports = {validateSignUpData,validateProfileData};