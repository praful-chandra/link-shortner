const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const writerNotifications = new Schema({

    writerCode:{
        type : String,
        required : true
    },
    fromBlogs:[
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

})

module.exports = mongoose.model("writerNotifications",writerNotifications);