const jwt = require("jsonwebtoken");
const Admin = require("../models/admin-model");
require("dotenv").config();

const degenerateToken = (data) => {
  return jwt.verify(data, process.env.JWT_KEY);
};

const authenticateAdmin = async (req, res, next) => {
  // const token = req.headers;
  try {
    const token = req.headers.token;
    let id = degenerateToken(token)["id"];
    const admin = await Admin.findOne({ '_id': id });
    if (admin) {
    //   console.log(admin);
      next();
    } else {
      let success = 0;
      res.status(401).json({ success, message: "Unauthoriized Access" });
    }
  } catch (error) {
    console.log(error);
    let success = 0;
    res.status(401).json({ success, message: "Unauthoriized Access" });
  }
};

module.exports = authenticateAdmin;
