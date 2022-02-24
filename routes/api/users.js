const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const keys = require("../../config/keys");
const verify = require("../../utilities/verify-token");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");
require("dotenv").config();
const adminId = process.env.ADMIN_ID;

// register a user
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user.id,
                name: user.name,
              };
              // Sign token
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 31556926, // 1 year in seconds
                },
                (err, token) => {
                  if (err) {
                    console.log(err);
                  } else {
                    req.io.sockets.emit("users", user.username);
                    res.json({
                      success: true,
                      token: "Bearer " + token,
                      name: user.name,
                    });
                  }
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});
// log in a user
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const username = req.body.username;
  const password = req.body.password;
  // Find user by username
  User.findOne({ username }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "Username not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              name: user.name,
              username: user.username,
              userId: user._id,
            });
          }
        );
      } else {
        return res.status(400).json({ message: "Password incorrect" });
      }
    });
  });
});

// get user details
router.get("/", (req, res) => {
  try {
    let jwtUser = jwt.verify(verify(req), keys.secretOrKey);
    let id = mongoose.Types.ObjectId(jwtUser.id);

    User.aggregate()
      .match({ _id: { $not: { $eq: id } } })
      .project({
        password: 0,
        __v: 0,
        date: 0,
      })
      .exec((err, users) => {
        if (err) {
          console.log(err);
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Failure" }));
          res.sendStatus(500);
        } else {
          res.send(users);
        }
      });
  } catch (err) {
    console.log(err);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Unauthorized" }));
    res.sendStatus(401);
  }
});
// get status of a blocked user
router.get("/block/:id", async (req, res) => {
  try {
    const blockuser = await User.findOne({ _id: req.params.id });
    if (!blockuser) {
      return res.status(400).send({ msg: "Username not found" });
    }
    return res.status(200).send(blockuser.blocked);
  } catch (error) {
    return res.status(401).send(error);
  }
});

// change password using userid
router.put("/setting/:id", async (req, res) => {
  try {
    const oldpassword = req.body.oldpassword;
    // Find user by id
    const existuser = await User.findOne({ _id: req.params.id });
    // Check if user exists
    if (!existuser) {
      return res.send({ usernamenotfound: "Username not found" });
    }
    // Check password
    const isMatch = await bcrypt.compare(oldpassword, existuser.password);
    if (!isMatch) {
      return res.status(400).send({ message: "current password incorrect" });
    }
    const newpassword = req.body.password;
    if (oldpassword == newpassword) {
      return res
        .status(400)
        .send({ message: "current password and new pasword are the same" });
    } else {
      // hash password

      const hashedPassword = await bcrypt.hash(newpassword, 10);
      const result = await User.updateOne(
        { _id: req.params.id },
        { $set: { password: hashedPassword } }
      );
      if (result.nModified == 1) {
        return res.status(200).send({ message: "seccess change password" });
      }
      return res.status(400).send({ message: "cant save" });
    }
  } catch (error) {
    return { message: error };
  }
});

//update user information using userid
router.put("/profile/:id", async (req, res) => {
  try {
    const existUser = await User.findOne({ _id: req.params.id });
    if (!existUser) {
      return res.status(401).send({ msg: "no user with this id" });
    }

    const result = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          pic: req.body.pic,
          gender: req.body.gender,
          age: req.body.age,
          bio: req.body.bio,
          country: req.body.location,
          hobbies: req.body.hobbies,
          blocked: false,
        },
      }
    );
    console.log(result);
    if (result.nModified == 1) {
      const activeUser = localStorage.getItem("currentUser");
      const tokenact = activeUser.token;
      const usernameact = activeUser.username;
      const useridact = activeUser.userId;
      const currentUser = {
        name: req.body.name,
        success: true,
        token: tokenact,
        userId: useridact,
        username: usernameact,
      };
      return res.send({ currentUser });
    } else {
      res.status(400).send({ msg: "user already apdated" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: `error.message` });
  }
});

// get a user information using username headers  (user userame )
router.get("/users/", async (req, res) => {
  try {
    const Users = await User.findOne({ username: req.headers.username });
    res.send(Users);
  } catch (error) {
    console.log(error);
    res.status(400).send("cannot get users");
  }
});

// get id of a user  using username params
router.get("/users/id/:username", async (req, res) => {
  try {
    const Users = await User.findOne({ username: req.params.username });
    res.send(Users.id);
  } catch (error) {
    console.log(error);
    res.status(400).send("cannot get users");
  }
});

// delate a user information using userid ( eutorized by admin )
router.delete("/:id", async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    //console.log(result)
    if (result.deletedCount) {
      return res.send({ msg: "user succesfully deleted" });
    }
    res.status(400).send("user already removed");
  } catch (error) {
    console.log(error);
    res.status(400).send("user doesn't exist");
  }
});

// get all users using admin id (autorised by admin)
router.get("/admin/:id", async (req, res) => {
  try {
    if (req.params.id != adminId) {
      return res.status(401).send({ message: "cannot get all users" });
    }
    const Users = await User.find();
    res.send(Users);
  } catch (error) {
    res.status(400).send("cannot get users");
  }
});
// block a user block user using admin id ( autorised by admin)
router.put("/admin/:id", async (req, res) => {
  try {
    const existUser = await User.findOne({ _id: req.params.id });

    if (!existUser) {
      return res.status(401).send({ msg: "no user with this id" });
    }

    let result = await User.updateOne(
      { _id: req.params.id },
      { $set: { blocked: true } }
    );
    if (result.nModified == 1) {
      return res.status(200).send({ msg: "success user blocked" });
    }
    result = await User.updateOne(
      { _id: req.params.id },
      { $set: { blocked: false } }
    );
    return res.status(200).send({ msg: "success user unblocked" });
  } catch (error) {
    res.status(400).send("cannot get users");
  }
});

// get unique datails of stat blocked useing userid
router.get("/unique/:id", async (req, res) => {
  try {
    const Userdet = await User.findOne({ _id: req.params.id });
    if (!Userdet) {
      return res.send({ msg: "cannot get your account" });
    }
    return res.status(200).send(Userdet.blocked);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "cannot get users" });
  }
});

module.exports = router;
