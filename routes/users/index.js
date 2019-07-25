const express = require("express");
const Sequelize = require("sequelize");

const models = require("../../models/index");

const router = express.Router();
const { Op } = Sequelize;

router.get("/", (req, res) => {
  models.User.findAll({
    where: Sequelize.where(
      Sequelize.fn(
        "concat",
        Sequelize.fn("LOWER", Sequelize.col("firstName")),
        " ",
        Sequelize.fn("LOWER", Sequelize.col("lastName"))
      ),
      {
        [Op.like]: `%${req.query.q.toLowerCase()}%`
      }
    )
  })
    .then(users => {
      res.json({
        data: users
      });
    })
    .catch(err => {
      res.status(422).json({
        error: err
      });
    });
});

module.exports = router;
