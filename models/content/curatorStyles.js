const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const curatorStyle = new Schema({
    curatorCode:{
        type : String,
        required : true
    },
    name :{
        type : String,
        required : true
    },
    description:{
        type :String,
        required : true
    },
    Collaborators :[
        {
            curatorCode:{
                type : String,
                required : true
            },
            name :{
                type : String,
                required : true
            }
        }
    ],
    views :{
        type :Number,
        default : 0
    },
    Designs :[
        {
            designCode:{
                type : String,
                required : true
            }
        }
    ],
    date : {
        type:Date,
        default : Date.now
    },
    coverImg :{
        type : String,
        default : "no img"
    },
    styleCode : {
        type : String,
        required :true
    }


});

module.exports=newCuratorStlyes = mongoose.model("curatorStyles", curatorStyle);

