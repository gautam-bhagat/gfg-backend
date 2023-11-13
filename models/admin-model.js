const mongoose =  require('mongoose')

const {Schema} = mongoose

const AdminSchema = new Schema ({
    username :{
        type : String
    },
    password :{
        type : String
    },
   
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const Admin = mongoose.model("Admin",AdminSchema);

module.exports = Admin;
