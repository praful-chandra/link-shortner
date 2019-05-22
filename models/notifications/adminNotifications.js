const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminNotification = new Schema({

    adminCode : {
        type : String,
        required : true
    },
    fromTl:[
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
    fromCurator :[
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
    fromWriter:[
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

module.exports= newAdminNotifications = mongoose.model("AdminNotifications",AdminNotification)