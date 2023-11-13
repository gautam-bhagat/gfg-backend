const express = require("express");
const bypass = require("../middleware/bypass");
const Admin = require("../models/admin-model");

const router = express.Router();
const bcrypt = require("bcrypt");

const saltRounds = 10;
router.get("/", bypass, (req, res) => {
  res.send("Admin Api Working !!");
});

router.post("/create", bypass, async (req, res) => {
 try {
    var { username, password } = req.body;

    const checkUser = await Admin.findOne({ username: username });
    let success = 0;
    
    if (checkUser) {
      return res
        .status(201)
        .json({ success, message: "Username not available !!" });
    } else {
      password = await encryptPass(password);
      
      let data = {username,password};
      const admin = Admin(data)
      await admin.save();
      
      success = 1;
  
      return res.status(200).json({success,message:"Account Created"});
    }
  
 } catch (error) {
    console.log(error);
    return res.status(500).json({success:0,message:"Internal Server Error"});
 }
});

///Function to encrypt Password
const encryptPass = async (pass) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const secPass = await bcrypt.hash(pass, salt);
  return secPass;
};

///Function to decrypt Password
const decryptPass = async (secured, raw) => {
  let passwordMatches = await bcrypt.compare(raw, secured);
  return passwordMatches;
};

module.exports = router;
