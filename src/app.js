const express = require("express");
const app = express(); //instance of express
const connetDB = require("./config/dtabase");
const cookieParser=require("cookie-parser");


app.use(express.json());
app.use(cookieParser());
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


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
