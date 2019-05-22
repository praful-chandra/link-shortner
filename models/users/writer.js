const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Writer = new Schema({
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
        default: "writer"
    },
    isInit: {
        type : Boolean,
        default : false
    },
    tlCode:{
        type :String,
        required : true
    },
    authId:{
        type : mongoose.Types.ObjectId,
        ref:"WriterAuth"
    },
    writerCode :{
        type : String,
        required : true
    },
    gender:String,
    isVerified:{
        type : Boolean,
        default : false
    },
    avatar : String,
    blogs :[
        {
            blogCode:{
                type : String,
                required : true
            }
        }
    ]
});

module.exports = newWriter = mongoose.model("writer", Writer);