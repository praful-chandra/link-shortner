const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new Schema({
    name : {
        type:String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    typeOfUser : {
        type : String,
        default: "admin"
    },
    authId : {
        type : mongoose.Types.ObjectId,
        ref:"adminAuth"
    },
    adminCode :{
        type : String,
        required : true
    } 
});

module.exports = newAdmin = mongoose.model("admin", Admin);