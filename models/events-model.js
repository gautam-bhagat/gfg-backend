const mongoose = require('mongoose');

const {Schema} = mongoose;

const EventSchema =  new Schema({
        name :{
            type : String,
            require : true
        },
        date : {
            type : Date,
        },
        description: {
            type : String
        },
        image : {
            type : String
        }
});

const Events =  mongoose.model("Events",EventSchema);

module.exports = Events;