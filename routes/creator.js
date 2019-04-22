if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = express.Router();
const User = require("../model/user.js");

router.post("/edit", async (req, res) => {
  try {
    const query = { userid: req.user.userid };
    const updatedData = {
      userimage: req.body.userimage,
      userdesc: req.body.userdesc,
      username: req.body.username
    };
    const user = await User.findOneAndUpdate(query, updatedData);
    res.json(updatedData);
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const query = { userid: req.user.userid };
    const user = await User.findOne(query);
    const creatorData = {
      userimage: user.userimage,
      userdesc: user.userdesc,
      username: user.username
    };
    res.json(creatorData);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
