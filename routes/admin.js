const express = require("express");
const bypass = require("../middleware/bypass");
const Admin = require("../models/admin-model");

const jwt = require("jsonwebtoken")
require("dotenv").config();

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

router.post("/login",bypass,async (req,res)=>{
  let {username,password} = req.body;

  let admin = await  Admin.findOne({username :  username});
  if(admin){
    let passChecked =  await decryptPass(admin.password,password)
    if(passChecked){
      const admintoken = generateToken({id:admin["_id"]});
      return res.status(202).json({success : 1, admintoken,message :"Logged In"})
    }else{
      return res.status(401).json({success : 0, message :"Invalid Credentials!"})
    }
  }
  else{
    return res.status(401).json({success : 0, message :"No Such Account! Contact Administrator"})
  }

})

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

const generateToken = (data) => {
  const SECRET_KEY = process.env.JWT_KEY;
  const token = jwt.sign(data, SECRET_KEY);
  return token;
};

const degenerateToken = (data) =>{
 return jwt.verify(data, process.env.JWT_KEY);
}

module.exports = router;
