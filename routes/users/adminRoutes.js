const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");   
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");

const TeamLeader = mongoose.model("teamLeader");
const curator =  mongoose.model("curator");
const writer = mongoose.model("writer");

const adminNotifications = mongoose.model("AdminNotifications");

// PATH         /api/admin/test
// ACCESS        public
// ABOUT        testing admin route
router.get("/test",(req,res)=>{
    res.json({message :"admin route works"});
});


// PATH         /api/admin/viewAlltl
// ACCESS        PRIVATE
// ABOUT        returns all the teamleaders 
router.get("/viewalltl",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "admin"){
        TeamLeader.find().sort({date: -1}).then(
            tlData=>{
                res.json(tlData)
            }
        ).catch(err=>res.json({error : err}))
    }else{
        res.json({error : " you are not authorized to perform this action"})
    }
})

// PATH         /api/admin/viewAllwriter
// ACCESS        PRIVATE
// ABOUT        returns all the teamleaders 
router.get("/viewallwriter",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "admin"){
        writer.find().then(
            writerData=>{
                res.json(writerData)
            }
        ).catch(err=>res.json({error : err}))
    }else{
        res.json({error : " you are not authorized to perform this action"})
    }
})

// PATH         /api/admin/viewAllcurator
// ACCESS        PRIVATE
// ABOUT        returns all the teamleaders 
router.get("/viewallcurator",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "admin"){
        curator.find().then(
            curatorData=>{
                res.json(curatorData)
            }
        ).catch(err=>res.json({error : err}))
    }else{
        res.json({error : " you are not authorized to perform this action"})
    }
})

// PATH         /api/admin/curatorundertl
// ACCESS        PRIVATE
// ABOUT        returns all the teamleaders under current admin
router.get("/curatorundertl",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "admin"){
        curator.find({tlCode : req.body.tlCode}).then(
            curatorData=>{
                res.json(curatorData)
            }
        ).catch(err=>res.json({error:err}))

    }else{
        res.json({error : " you are not authorized to perform this action"})
    }
})

// PATH         /api/admin/writerundertl
// ACCESS        PRIVATE
// ABOUT        returns all the writers under current admin
router.get("/writerundertl",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "admin"){
        writer.find({tlCode : req.body.tlCode}).then(
            curatorData=>{
                res.json(curatorData)
            }
        ).catch(err=>res.json({error:err}))

    }else{
        res.json({error : " you are not authorized to perform this action"})
    }
})

// PATH         /api/admin/reassigncurator
// ACCESS        PRIVATE
// ABOUT        assign curator from one tl to other tl
router.patch("/reassigncurator",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "admin"){

        curator.findOne({curatorCode : req.body.curatorCode,tlCode : req.body.oldTlCode}).then(
            curatorData=>{
               if(curatorData){
                   curator.findOneAndUpdate({curatorCode : req.body.curatorCode},{$set :{tlCode : req.body.newTlCode}},{new: true})
                   .then(updatedCuratorData=>{
                       res.json(updatedCuratorData)
                   }).catch(err=>res.json({error : err}))
               }else{
                   res.json({error : "find curator error"})
               }
               
            }
        ).catch(err=>res.json({error : err}))

    }else{
        res.json({error : " you are not authorized to perform this action"})
    }
})

// PATH         /api/admin/reassignwriter
// ACCESS        PRIVATE
// ABOUT        assign writers from one tl to other tl
router.patch("/reassignwriter",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "admin"){

        writer.findOne({writerCode : req.body.writerCode,tlCode : req.body.oldTlCode}).then(
            writerData=>{
               if(writerData){
                   writer.findOneAndUpdate({writerCode : req.body.writerCode},{$set :{tlCode : req.body.newTlCode}},{new: true})
                   .then(updatedwriterData=>{
                       res.json(updatedwriterData)
                   }).catch(err=>res.json({error : err}))
               }else{
                   res.json({error : "find writer error"})
               }
               
            }
        ).catch(err=>res.json({error : err}))

    }else{
        res.json({error : " you are not authorized to perform this action"})
    }
})

// PATH         /api/admin/getnotificationsfromtl
// ACCESS        PRIVATE
// ABOUT        returns all the notifications from tl
router.get("/getnotificationsfromtl",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "admin"){        
        adminNotifications.find({adminCode : req.user.adminCode}).sort({date:-1}).then(
            NotificationData=>{
                
                res.json({tlNotifications: NotificationData[0].fromTl})
            }
        ).catch(err=>res.json({error: err}))
    }else{
        res.json({error : " you are not authorized to perform this action"})

    }
})


// PATH         /api/admin/getnotificationsfromcurator
// ACCESS        PRIVATE
// ABOUT        returns all the notifications from curator
router.get("/getnotificationsfromcurator",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "admin"){
        
        adminNotifications.find({adminCode : req.user.adminCode}).sort({date:-1}).then(
            NotificationData=>{
                res.json({curatorNotifications : NotificationData[0].fromCurator})
            }
        ).catch(err=>res.json({error: err}))
    }else{
        res.json({error : " you are not authorized to perform this action"})

    }
})

// PATH         /api/admin/getnotificationsfromwriter
// ACCESS        PRIVATE
// ABOUT        returns all the notifications from writer
router.get("/getnotificationsfromwriter",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "admin"){
        
        adminNotifications.find({adminCode : req.user.adminCode}).sort({date:-1}).then(
            NotificationData=>{
                res.json({writerNotifications : NotificationData[0].fromWriter})
            }
        ).catch(err=>res.json({error: err}))
    }else{
        res.json({error : " you are not authorized to perform this action"})

    }
})



module.exports = router;