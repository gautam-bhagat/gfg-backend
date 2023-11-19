const mongoose = require('mongoose')


const ImageSchema = mongoose.Schema({
    event : {
        type : String
    },
    image : {
        type : String
    },
    timeStamp :{
        type :Date,
        default : Date.now
    }
})

const Images = mongoose.model("Images",ImageSchema);

module.exports = Images;