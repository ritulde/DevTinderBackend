const express = require("express");
const app = express(); //instance of express
const connetDB = require("./config/dtabase");
const { adminAuth, userAuth } = require("./middleware/auth");
const User = require("./model/user");

app.post("/signup", async (req, res) => {
  //create new instance of userModel
  const user = new User({
    firstName: "Virat",
    lastName: "De",
    email: "virat@gmail.com",
    password: "Virat@123",
  });
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status("400").send("Error");
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
