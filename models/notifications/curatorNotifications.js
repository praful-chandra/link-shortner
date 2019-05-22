const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CuratorNotifications = new Schema({
curatorCode:{
    type : String,
    required : true
},
fromStyles :[
    {
        title : String,
        Body : String,
        date : {
            type : String,
            default : Date.now
        },
        isSeen : {
            type: Boolean,
            default : false
        }
    }
],
fromDesigns:[
    {
        title : String,
        Body : String,
        date : {
            type : String,
            default : Date.now
        },
        isSeen : {
            type: Boolean,
            default : false
        }
    }
]
});

module.exports = mongoose.model("curatorNotifications",CuratorNotifications);