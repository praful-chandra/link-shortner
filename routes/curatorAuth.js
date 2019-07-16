const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const curatorAuth = mongoose.model("curatorAuth");  
const curatorProfile = mongoose.model("curator");

const secretOrKey = config.get("secretOrKey");

//PATH : /api/curatorauth/test
//ACCESS : PUBLIC
//DESC : test route
router.get("/test",(req,res)=>{
    res.json({message : "curatorAuth route works"})
})


//PATH : /api/curatorauth/login
//ACCESS : PUBLIC
//DESC : login curator
router.post("/login",
(req,res)=>{

    curatorAuth.findOne({email : req.body.email}).then(curatorAuthData=>{
        if(!curatorAuthData)
            res.status(401).json({err : "AUTH ERROR"})
        else{
            bcrypt.compare(req.body.password,curatorAuthData.password,(err,result)=>{
                if(err)
                res.status(401).json({auth : "AUTH ERROR"});

                if(result){

                    curatorProfile.findOne({curatorCode : curatorAuthData.curatorCode}).then(curatorProfileData=>{
                        jwt.sign({
                            users:{
                                curatorCode : curatorProfileData.curatorCode,
                                typeOfUser : curatorProfileData.typeOfUser,
                                name : curatorProfileData.name,
                                avatar : curatorProfileData.avatar
                            }
                        },secretOrKey,{ expiresIn : 6600} , (err,token)=>{
                            res.json({success : true, token:"Bearer "+token})
                          })
                    })

                }else{
                res.status(401).json({auth : "AUTH ERROR"});

            }
            })
        }
        
    })
})

//PATH : /api/curatorauth/current
//ACCESS : PRIVATE
//DESC : returns current curator
router.get("/current",
passport.authenticate("jwt",{session:false}),
(req,res)=>{
    if(req.user.typeOfUser === "curator"){
    res.json({
        curatorCode : req.user.curatorCode,
        name : req.user.name,
        typeOfUser : req.user.typeOfUser,
        avatar : req.user.avatar
    }) 
    }
})




module.exports = router;