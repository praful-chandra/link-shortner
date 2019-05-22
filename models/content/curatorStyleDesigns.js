const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const curatorStyleDesign = new Schema({
    styleCode:{
        type : String,
        required : true
    },
    curatorCode:{
        type : String,
        required : true
    },
    title :{
        type :String,
        required :true
    },
    description :{
        type :String,
        required : true
    },
    label :String,
    price: String,
    modelSize:String,
    avaliableSize:[String],
    productDetails:[String],
    views :{
        type : Number,
        default : 0
    },
    coverImg : {
        type : String,
        default:"no img"
    },
    date :{
        type :Date,
        default  : Date.now
    },
    designCode : {
        type : String,
        required :true
    },
    otherImages : [String]
});

module.exports = newCuratorStyleDesigns = mongoose.model("curatorStyleDesign", curatorStyleDesign);

