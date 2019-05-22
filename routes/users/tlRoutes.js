const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");   


const curator = mongoose.model("curator");
const writer = mongoose.model("writer");
const TL = mongoose.model("teamLeader");

const tlNotifications = mongoose.model("teamLeaderNotifications");

// PATH         /api/tl/test
// ACCESS        PUBLIC
// ABOUT        tests tl routes
router.get("/test",(req,res)=>{
    res.json({message : "tl route works"})
});


// PATH         /api/tl/mycurators
// ACCESS        PRIVATE
// ABOUT        returns all the curators under current team leader
router.get("/mycurators",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "teamLeader"){
         curator.find({tlCode : req.user.tlCode}).then(curatorData=>{
             res.json(curatorData)
         }).catch(err=>res.json({error : err}))
    }else{
        res.json({error : "you are not authenticated to perform this action"})
    }
})


// PATH         /api/tl/mywriters
// ACCESS        PRIVATE
// ABOUT        returns all the writers under current team leader
router.get("/mywriters",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "teamLeader"){
         writer.find({tlCode : req.user.tlCode}).then(curatorData=>{
             res.json(curatorData)
         }).catch(err=>res.json({error : err}))
    }else{
        res.json({error : "you are not authenticated to perform this action"})
    }
})


// PATH         /api/tl/getnotificationsfromcurator
// ACCESS        PRIVATE
// ABOUT        returns all the notifications from curators
router.get("/getnotificationsfromcurator",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "teamLeader"){
       
        tlNotifications.find({tlCode : req.user.tlCode}).then(
            tlNotificationData=>{
                res.json({curatorNotifications : tlNotificationData[0].fromCurator})
            }
        ).catch(err=>res.json({error : err}))

   }else{
       res.json({error : "you are not authenticated to perform this action"})
   }
})


// PATH         /api/tl/getnotificationsfromwriter 
// ACCESS        PRIVATE
// ABOUT        returns all the notifications from writers
router.get("/getnotificationsfromwriter",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
    if(req.user.typeOfUser === "teamLeader"){
       
        tlNotifications.find({tlCode : req.user.tlCode}).then(
            tlNotificationData=>{
                res.json({writerNotifications : tlNotificationData[0].fromWriter})
            }
        ).catch(err=>res.json({error : err}))

   }else{
       res.json({error : "you are not authenticated to perform this action"})
   }
})

// PATH         /api/tl/bycode 
// ACCESS        PUBLIC               
// ABOUT        returns tl profile by code
router.post("/byCode",
(req,res)=>{
TL.findOne({tlCode : req.body.tlCode}).then(tlData=>{
    res.json({success : true, tlData})
}).catch(err=>res.json({success : false,error :err}))
}
)

module.exports = router;