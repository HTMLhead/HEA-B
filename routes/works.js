const express = require("express");
const router = express.Router();
const Work = require("../model/work.js");
const _u = require("../util.js");

router.post("/", async (req, res) => {
  try {
    const query = { userid: req.user.userid };
    const works = await Work.find(query);
    res.json(works);
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/add", async (req, res) => {
  try {
    const query = {
      worktitle: req.body.worktitle,
      workimage: req.body.workimage,
      workdesc: req.body.workdesc,
      workview: false,
      userid: req.user.userid
    };
    const work = new Work(query);
    await work.save();
    const works = await Work.find({ userid: req.user.userid });
    res.json(works);
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/view", async (req, res) => {
  try {
    const query = {
      _id: req.body.workid
    };
    const works = await Work.findOne(query);
    res.json(works);
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/edit", async (req, res) => {
  try {
    const query = {
      _id: req.body.workid
    };
    const updatedData = {
      worktitle: req.body.worktitle,
      workdesc: req.body.workdesc,
      workimage: req.body.workimage
    };
    const work = await Work.findOneAndUpdate(query, updatedData);
    res.json({ ...updatedData, _id: req.body.workid });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/remove", async (req, res) => {
  try {
    const query = {
      _id: req.body.workid
    };
    const work = await Work.findOneAndRemove(query);
    res.json(work);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
