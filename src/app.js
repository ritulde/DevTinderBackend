const express = require("express");
const app = express(); //instance of express
const connetDB = require("./config/dtabase");
const { adminAuth, userAuth } = require("./middleware/auth");
const User = require("./model/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());


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
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(isPasswordValid){
      res.send("login successful");
    }else{
      throw new Error("Password not valid")
    }
  }catch(err){
    res.status(400).send("Somthing wrong: "+ err.message);
  }
})



//get all user
app.get("/feed", async (req, res) => {
  try {
    const allUser = await User.find({});
    if (!allUser) {
      res.status(400).send("User NOt found");
    }
    res.send(allUser);
  } catch (err) {
    res.status(400).send("Somthing went wrong: " + err.message);
  }
});



//get user by email
app.get("/user", async (req, res) => {
  const email = req.body.email;
  try {
    const userData = await User.find({ email: email });
    if (!userData.length) {
      res.status(400).send("User NOt found");
    } else {
      res.send(userData);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//delete user
app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    //const deleteUser = await User.findByIdAndDelete({ _id: userId })
    const deleteUser = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    app.status(400).send("Somthing wrong");
  }
});

//update user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  const allow_Updates = ["age", "skills", "about", "photos"];

  try {
    const isAllowUpdates = Object.keys(data).every((key) => {
      allow_Updates.includes(key);
    });
    if (!isAllowUpdates) {
      throw new Error("Update not allowed");
    }
    await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("User Updataed Successfully");
  } catch (err) {
    res.status(400).send("Something wrong Happened. " + err.message);
  }
});

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
