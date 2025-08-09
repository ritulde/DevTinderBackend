const jwt = require("jsonwebtoken");
const User = require("../model/user");
const userAuth = async (req, res, next) => {
  //read token and vlaidate
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid token");
    }
    const decodedMessage = await jwt.verify(token, "DevTinder@790");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Invalid user");
    }
    req.user=user;
    next();
  } catch (err) {
    res.status(400).send("somthing wrong in auth: "+ err.message);
  }
};
module.exports = { userAuth };
