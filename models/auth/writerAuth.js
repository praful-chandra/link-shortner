const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WriterAuth = new Schema({
  
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
    writerCode :{
        type : String,
        required : true
    }
});

module.exports = writerAuth = mongoose.model("WriterAuth", WriterAuth);