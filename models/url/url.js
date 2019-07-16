const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dt = new Date();

const url = new Schema({

    longUrl :{
        type : String,
        required : true
    },
    shortUrl :{
        type:String,
        required : true
    },
    curatorCode :{
        type : String,
        required : true
    },
    created :{
        day:{
            type : String,
            default :  dt.getDate()
        },
        month:{
            type : String,
            default : (dt.getMonth() + 1)
        },
        year:{
            type : String,
            default : dt.getFullYear()
        }
    },
    date :{
        type : Date,
        default : Date.now
    },
    accessed:[
        {
            day : {
                type:String,
                required : true
            },
            month:{
                type : String,
                required : true
            },
            year:{
                type : String,
                required : true
            },
            device :{
                type : String,
                required : true
            },
            location : {
                type : String,
                required : true
            },
            date :{
                type : Date,
                default : Date.now
            }
        }
    ]

})

module.exports = URL = mongoose.model("url",url);