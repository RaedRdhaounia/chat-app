const express = require("express");
const router = express.Router();
const Request = require("../../models/Request");
const verify = require("../../utilities/verify-token");
const validateIssusInput = require("../../validation/issus");
require("dotenv").config();
const adminId = process.env.ADMIN_ID;

// post a request (from users)
router.post("/contact", (req, res) => {
  // Form validation
  const { errors, isValid } = validateIssusInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Request.find({ username: req.body.username }).then((request) => {
    if (!request) {
      return res.status(400).json({ message: "Username is not correct " });
    } else {
      const newReq = new Request({
        username: req.body.username,
        email: req.body.email,
        body: req.body.body,
        name: req.body.name,
      });
      newReq
        .save()
        .then(res.status(200).json({ message: "successfully send request" }))
        .catch((err) => console.log(err));
    }
  });
});

// get request from admin
router.get("/contact/:id", (req, res) => {
  if (req.params.id != adminId) {
    return res.status(401).send({ msg: "cannot get all users" });
  }
  Request.find().then((request) => {
    if (request == {}) {
      return res.status(400).send({ msg: "no request get" });
    }
    return res.status(200).send(request);
  }).catch(error=> res.status(400).send(error));
});

// delate request from admin
router.delete("/contact/:id", (req, res) => {
  if (req.params.id != adminId) {
    return res.status(401).send({ message: "you can't delate requests" });
  }
Request.findOne({username: req.body.username})
})

module.exports = router;
