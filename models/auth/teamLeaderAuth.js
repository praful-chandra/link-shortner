const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TLAuth = new Schema({
  
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
    tlCode:{
        type : String,
        required : true
    }
  
});

module.exports = newTlAuth = mongoose.model("TLAuth", TLAuth);