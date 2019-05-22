const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminAuth = new Schema({
  
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    createdOn :{
        type : Date,
        default : Date.now
    },
    adminCode : {
        type : String,
        required : true
    }
  
});

module.exports = newAdminAuth = mongoose.model("adminAuth", AdminAuth);