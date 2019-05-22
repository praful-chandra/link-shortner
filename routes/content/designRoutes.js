const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");   

const Design = mongoose.model("curatorStyleDesign");




router.get("/test",(req,res)=>{
    res.json({message :"design route works"});
});


router.get("/all",(req,res)=>{
    Design.find().sort({date: -1}).then(designs =>{
        res.json({
            success : true,
            data : designs
        })
        
    }).catch(err=>res.json({
        success : false,
        error : err
    }))
})

router.post("/byCode",(req,res)=>{

    Design.findOne({designCode : req.body.designCode}).then(design =>{
        
        res.json({
            success : true,
            data : design
        })
        
    }).catch(err=>res.json({
        success : false,
        error : err
    }))

})

module.exports = router;