const express = require('express');
const Images = require('../models/image-model');
const bypass = require('../middleware/bypass');
const router = express.Router();

router.get('/all', bypass, async(req,res)=>{
    const result = await Images.find({});
    res.status(202).json({result})
})

router.post('/add', bypass, async(req,res)=>{

    try {
        const { event,image} = req.body;
    const imageObj = await Images({event,image})
    await imageObj.save()

    // const result = await Images.find({});
    res.status(202).json({success : 1 , imageObj})
    } catch (error) {
        console.log(error)
        res.status(500).json({success : 0 , message :"Internal Server Error"})
    }
})

router.delete('/delete', bypass, async(req,res)=>{

    try {
            const {_id} = req.body;
            let response = await Images.findOneAndDelete({ _id: _id })
    // const result = await Images.find({});
    res.status(202).json({success : 1 , response})
    } catch (error) {
        console.log(error)
        res.status(500).json({success : 0 , message :"Internal Server Error"})
    }
})


module.exports = router