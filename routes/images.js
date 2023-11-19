const express = require('express');
const Images = require('../models/image-model');
const bypass = require('../middleware/bypass');
const router = express.Router();

router.get('/all', bypass, async(req,res)=>{
    const result = await Images.find({});
    res.status(202).json({result})
})

router.post('/add', bypass, async(req,res)=>{

    const { event,image} = req.body;
    const imageObj = await Images({event,image})
    await imageObj.save()

    // const result = await Images.find({});
    res.status(202).json({imageObj})
})


module.exports = router