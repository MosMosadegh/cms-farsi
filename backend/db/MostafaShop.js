
const mysql = require("mysql");

const MostafaShopDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mostafa_shop_cms",
});

module.exports = MostafaShopDB;
