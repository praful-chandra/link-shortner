const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamLeader = new Schema({
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
        default: "teamLeader"
    },
    isInit: {
        type : Boolean,
        default : false
    },
    tlCode:{
        type :String,
        required : true
    },
    authId :{
        type : mongoose.Types.ObjectId,
        ref:"TLAuth"
    },
    curators:[{
        curatorCode:String
    }],
    writers:[{
        writerCode : String
    }],
    avatar :{
        type :String, 
        default : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
    }
});

module.exports = newTeamLeader = mongoose.model("teamLeader", TeamLeader);