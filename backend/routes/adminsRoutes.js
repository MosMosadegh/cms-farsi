const express = require("express");
const MostafaShopDB = require("./../db/MostafaShop");

const adminsRouter = express.Router();

// routes

adminsRouter.get("/", (req, res) => {
  let adminToken = req.headers.authorization;

  let selectMainAdminQuery = `SELECT * FROM Admins WHERE token = "${adminToken}"`;

  MostafaShopDB.query(selectMainAdminQuery, (err, result) => {
    if (err) {
      res.send(null);
    } else {
      res.send(result);
    }
  });
});

module.exports = adminsRouter;
