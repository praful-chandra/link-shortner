const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");   

const Blog = mongoose.model("blog");




router.get("/test",(req,res)=>{
    res.json({message :"blog route works"});
});


router.get("/all",(req,res)=>{
    Blog.find().sort({date: -1}).then(blogs =>{
        res.json({
            success : true,
            data : blogs
        })
        
    }).catch(err=>res.json({
        success : false,
        error : err
    }))
})

router.post("/byCode",(req,res)=>{

    Blog.findOne({blogCode : req.body.blogCode}).then(blog =>{
        
        res.json({
            success : true,
            data : blog
        })
        
    }).catch(err=>res.json({
        success : false,
        error : err
    }))

})

module.exports = router;