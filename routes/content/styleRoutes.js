const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");   

const Style = mongoose.model("curatorStyles");




router.get("/test",(req,res)=>{
    res.json({message :"style route works"});
});


router.get("/all",(req,res)=>{
    Style.find().sort({date: -1}).then(styles =>{
        res.json({
            success : true,
            data : styles
        })
        
    }).catch(err=>res.json({
        success : false,
        error : err
    }))
})

router.post("/byCode",(req,res)=>{

    Style.findOne({styleCode : req.body.styleCode}).then(style =>{
        
        res.json({
            success : true,
            data : style
        })
        
    }).catch(err=>res.json({
        success : false,
        error : err
    }))

})

module.exports = router;