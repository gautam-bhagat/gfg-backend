const express = require("express");
const authenticateAdmin = require("../middleware/authenticate-admin");
const bypass = require("../middleware/bypass");
const Team = require("../models/team-model");
const router = express.Router();

router.get("/", authenticateAdmin, async (req, res) => {
  res.send("Working");
});

router.get("/all", bypass, async (req, res) => {
  const result = await Team.find({}).sort([["priority", 1]]);
  res.status(200).json({ result });
});

router.post("/add", authenticateAdmin, async (req, res) => {
  try {
    let success = 0;
    const {
      name,
      designation,
      image,
      gmail,
      linkedin,
      github,
      instagram,
      priority,
    } = req.body;
    let data = {
      name,
      designation,
      image,
      gmail,
      linkedin,
      github,
      instagram,
      priority,
    };

    if (!(name && designation && priority)) {
      return res
        .status(500)
        .json({ success, message: "Internal Server Error" });
    }
    const teamMember = await Team(data);
    await teamMember.save();
    if (teamMember) {
      success = 1;
      return res
        .status(202)
        .json({ success, message: "Added New Team Member" });
    } else {
      return res
        .status(500)
        .json({ success, message: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: 0, message: "Internal Server Error" });
  }
});

router.delete('/delete',authenticateAdmin,async (req,res)=>{
    const {id} = req.body;
    try{
        const t = await Team.findByIdAndDelete(id)
        console.log(t)
        return res.status(203).json({success :1,message:"Delete"})
    }catch(err){
        console.log(err);
        return res.status(500).json({success :0,message:"Internal Server Error"})
    }
})

router.put("/update", authenticateAdmin, async (req, res) => {
    try {
      let success = 0;
      const {
        _id,
        name,
        designation,
        image,
        gmail,
        linkedin,
        github,
        instagram,
        priority,
      } = req.body;
      let data = {
      
        name,
        designation,
        image,
        gmail,
        linkedin,
        github,
        instagram,
        priority,
      };
  
      if (!(name && designation && priority)) {
        return res
          .status(500)
          .json({ success, message: "Internal Server Error" });
      }
      await Team.findOneAndUpdate({_id},data);
      const teamMember = await Team.find({_id:_id})
      console.log(teamMember)
      if (teamMember) {
        success = 1;
        return res
          .status(202)
          .json({ success, message: "Updated Team Member" });
      } else {
        return res
          .status(500)
          .json({ success, message: "Internal Server Error" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: 0, message: "Internal Server Error" });
    }
  });

module.exports = router;
