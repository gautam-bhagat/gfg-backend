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
        images : {
            type : Array
        }
});

const Events =  mongoose.model("Events",EventSchema);

module.exports = Events;