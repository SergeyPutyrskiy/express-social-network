const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const models = require("../../models/index");

router.post("/", (req, res) => {
  const {
    firstName: firstNameReq,
    lastName: lastNameReq,
    email: emailReq,
    password: passwordReq,
    userName: userNameReq
  } = req.body;
  const saltRounds = 10;

  bcrypt.hash(passwordReq, saltRounds).then(hash => {
    models.User.create({
      userName: userNameReq,
      firstName: firstNameReq,
      lastName: lastNameReq,
      email: emailReq,
      password: hash
    })
      .then(user => {
        const { userName, firstName, lastName, email } = user;

        res.json({
          userName,
          firstName,
          lastName,
          email
        });
      })
      .catch(err =>
        res.status(422).json({
          error: err
        })
      );
  });
});

module.exports = router;