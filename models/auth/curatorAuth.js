const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CuratorAuth = new Schema({
  
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
    curatorCode :{
        type : String,
        required : true
    }
  
});

module.exports = curatorAuth = mongoose.model("curatorAuth", CuratorAuth);  