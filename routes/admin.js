const express = require('express');
const bypass = require('../middleware/bypass');
const Admin = require('../models/admin-model');

const router = express.Router();

router.get('/',bypass,(req,res)=>{
    res.send("Admin Api Working !!")
})


router.post('/create',bypass,async (req,res)=>{
    const {username, password} = req.body;

    const checkUser = await Admin.findOne({'username':username})
    let success = 0
    console.log(checkUser)
    if(!checkUser){

        return res.status(201).json({success , message : "Username not available !!"})
    }else{
        return res.status(200).send("Username available !!")
    }

    res.json({username,password})
})

module.exports = router