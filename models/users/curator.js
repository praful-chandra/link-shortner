const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Curator = new Schema({
    tlCode :{
        type : String,
        required : true
    },
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
        default: "curator"
    },
    isInit: {
        type : Boolean,
        default : false
    },
    curatorCode:{
        type :String,
        required : true
    },
    authId :{
        type : mongoose.Types.ObjectId,
        ref:"curatorAuth"
    },
    gender:String,
    avatar : {
        type : String,
        default :"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
    },
    isVerified : {
        type : Boolean,
        default  : false
    },
    subscribers : [
       { userId :{
           type : mongoose.Types.ObjectId,
           ref:"user"
       }}
    ],
    profile :{
        type : String,
        default : "no bio avaliable"
    },
    styles:[
        {
            styleCode : {
                type : String,
                required : true
            }
        }
    ],
    designs :[
        {
            designCode :{
                type : String,
                required : true
            }
        }
    ]
});

module.exports = newCurator = mongoose.model("curator", Curator);