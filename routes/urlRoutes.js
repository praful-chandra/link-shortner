const express = require("express");
const router = express.Router();
const passport = require("passport");
const validUrl = require("valid-url");
const shortId = require("shortid");
const mongoose = require("mongoose");
const config = require("config");

const URL = mongoose.model("url");

const baseURL = config.get("baseURL");


//PATH : /api/url/test
//ACCESS : PUBLIC
//DESC : test route
router.get("/test",
(req,res)=>{
    
    res.json("url route works")
}
)

//PATH : /api/url/addurl
//ACCESS : PRIVATE
//DESC : shortens and adds new url
router.post("/addurl",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    
    if(req.user.typeOfUser === "curator"){

        if(!validUrl.isUri(req.body.longUrl)){
            res.json({success : false , message : "url is invalid"})
        }else{

       
        URL.findOne({longUrl : req.body.longUrl}).then(urlData=>{
            if(urlData){
                res.json({success : false , err : "url already exists"})
            }else{

                const newURL = new URL({
                    longUrl : req.body.longUrl,
                    shortUrl : baseURL + shortId.generate(),
                    curatorCode : req.user.curatorCode
                })

                 newURL.save().then(newUrlData=>{
                     URL.find({curatorCode : req.user.curatorCode}).sort({date : -1}).then(allData=>res.json({success : true ,data : allData})).catch(err=>res.json(err))
                 }).catch(err=>console.log(err))
            }
        }).catch(err=>console.log(err))
    }
    }else
    res.json({err : "you are unAuthorized"})
})

//PATH : /api/url/myLinks
//ACCESS : PRIVATE
//DESC : returns current curator's links
router.get("/mylinks",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    URL.find({curatorCode : req.user.curatorCode}).sort({date:-1}).then(urlResult=>{
        res.json(urlResult)
    }).catch(err=>res.json({err : err}))
})




module.exports = router;
