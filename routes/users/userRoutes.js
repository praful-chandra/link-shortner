const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Blog = mongoose.model("blog");

router.post("/likeBlog",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    let userId = req.user._id;
   Blog.findOne({blogCode : req.body.blogCode}).then(blogData=>{
       
    if(blogData.likedBy.filter(user=>{
        
        return (user.userId.equals(userId))}).length > 0){
        
       Blog.findOneAndUpdate({blogCode : req.body.blogCode},{$pull:{likedBy:{userId }} } ,{new: true}).then(result =>res.json(result)).catch(err=>res.json(err))
    }else{
        
       Blog.findOneAndUpdate({blogCode : req.body.blogCode},{$push:{likedBy:{userId }} } ,{new: true}).then(result =>res.json(result)).catch(err=>res.json(err))
    }
   }).catch(err=>res.json(err));
})

module.exports = router;