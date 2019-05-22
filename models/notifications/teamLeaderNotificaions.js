const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TLnotifications = new Schema({

tlCode:{
    type : String,
    required : true
},
    fromCurator:[
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

module.exports=newTeamLeaderNotification = mongoose.model("teamLeaderNotifications",TLnotifications);

