const express = require("express");
const router = express.Router();
const { userAuth } = require("../middleware/auth");
const {validateProfileData} = require("../utils/validation")
router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("somthing wrong in getting profile: " + error.message);
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const user = req.user;
    Object.keys(req.body).forEach((key)=>user[key]=req.body[key]);
     await user.save();
    res.json({message: "User data updated successfully",data:user})
  } catch (err) {
    res.status(400).send("somthing wrong: " + err.message);
  }
});

module.exports = router;
