const express = require("express");
const bypass = require("../middleware/bypass");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/user-model");
const Token = require("../models/token-model");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const sendEmail = require("../utils/sendEmail");

require("dotenv").config();

router.get("/", bypass, (req, res) => {
  res.send("Hello User !!");
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

//Function to check if EmailID is from college
const checkEmailId = (mail) => {
  let domain = mail.split("@")[1];
  if (domain == "pccoepune.org") {
    return true;
  } else {
    return false;
  }
};

// Endpoint to create user
router.post("/create", bypass, async (req, res) => {
  var { name, email, password, profile } = req.body;

  let success = 0;
  try {
    //checking if any null value then throw error
    if (!(name && password && email)) {
      throw 500;
    }

    //Check if Email Already Exists
    const exist = await User.exists({ email: email });
    if (exist) {
      message = "Email Already in Use !!";
      return res.status(500).json({ success, message });
    }

    password = await encryptPass(password);
    const clgstudent = checkEmailId(email);
    const verified = false;

    const d = "looking";
    if (!profile) {
      profile = d;
      console.log("Inside");
    }

    const data = { name, password, email, profile, clgstudent, verified };

    const newUser = User(data);
    newUser.save();

    success = 1;

    console.log(req.get("host"));
    console.log(req.headers);
    const body = req.protocol + "://" + req.headers.host + "/api/user/create";
    sendEmail(body);
    message = "Kindly verify the email id!!";
    return res.status(200).json({ success, message });
  } catch (error) {
    //Error Catching
    console.log(error);
    success = 0;
    message = "Internal Server Error";
    return res.status(500).json({ success, message });
  }
});

//JSON WEB TOKEN GENERATION
const generateToken = (data) => {
  const SECRET_KEY = process.env.JWT_KEY;
  const token = jwt.sign(data, SECRET_KEY);
  return token;
};

//Email Verification Endpoint
router.get("/verify/:id", bypass, async (req, res) => {
  let success = 0;
  try {
    const id = req.params.id;
    const node = await User.findOne({ _id: id });
    // console.log(node);
    if (node && !node.verified) {
      const update = await User.findOneAndUpdate(
        { _id: id },
        { verified: true }
      );

      const data = { _id: id };
      const token = generateToken(data);

      const newToken = new Token({
        uid: id,
        token: token,
      });

      await newToken.save();

      success = 1;
      message = "Email Verified";
      return res.status(202).send(message);
    } else {
      message = "Invalid Link !!";
      return res.status(400).send(message);
    }
  } catch (error) {
    console.log(error);
    success = 0;
    message = "Internal Server Error";
    return res.status(500).json({ success, message });
  }
});

router.post("/login", bypass, async (req, res) => {
  let success = 0;
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    // console.log(user);
    if (user) {
      if (user.verified == false) {
        return res
          .status(401)
          .json({ success: 1, message: "Kindly verify your mail" });
      }

      const securedPass = user.password;
      const check = await decryptPass(securedPass, password);

      if (check == true) {
        const retrievedToken = await Token.findOne({ uid: user["_id"] });

        const token = retrievedToken.token;
        success = 1;
        message = "Logged In";
        return res.status(201).json({ success, message, token });
      } else {
        success = 0;
        message = "Invalid Credentials";
        return res.status(401).json({ success, message });
      }
    } else {
      success = 0;
      message = "No such account exists!!";
      return res.status(401).json({ success, message });
    }
  } catch (error) {
    console.log(error);
    success = 0;
    message = "Internal Server Error";
    return res.status(500).json({ success, message });
  }
});

module.exports = router;
