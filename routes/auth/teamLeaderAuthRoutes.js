const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");   
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");

const tlAuth = mongoose.model("TLAuth");
const tlProfile= mongoose.model("teamLeader");
const tlNotifications = mongoose.model("teamLeaderNotifications");

const makeCode=()=> {
    var text = "";
    var possible =
      "0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

// PATH         /api/tlauth/test
// ACCESS        PUBLIC
// ABOUT        tests teamleader auth routes
  router.get("/test",(req,res)=>{
    res.json({msg:"team leader Auth routes works"})
});

// PATH         /api/tlauth/adminregister
// ACCESS        PRIVATE
// ABOUT        adding teamleaders by admin
router.post("/adminregister",
passport.authenticate("jwt", { session: false }),
(req,res)=>{  
   if(req.user.typeOfUser === "admin"){
    tlAuth.findOne({email : req.body.tlemail}).then(tl=>{
        if(tl){
            res.status(409).json({email : "this emailId already exists"})
        }else{
            bcrypt.hash(req.body.tlpassword,10,(err,hash)=>{
                if(err)
                res.status(500).json(err)
                else{
                    const newTlAuth = new tlAuth({
                        email : req.body.tlemail,
                        password : hash,
                        tlCode : "TL"+makeCode()
                    })
                    flag = false;
                    do {
                        tlAuth.find({ tlCode: newTlAuth.tlCode }).then(data => {
                          if (data) {
                            if (data.length > 0) {
                              flag = true;
                              newTlAuth.tlCode = "TL" + makeCode();
                            } else {
                              flag = false;
                            }
                          } else {
                            flag = false;
                          }
                        });
                      } while (flag);
        
                    newTlAuth.save().then(tlAuthData=>{
                       //creating TL profile

                        new tlProfile({
                           name : req.body.tlname,
                           email : tlAuthData.email,
                           authId : tlAuthData._id,
                           tlCode : tlAuthData.tlCode,
                           isVerified : true
                       }).save().then(tlProfileData =>{

                        //create tl notifications

                          new tlNotifications({
                              tlCode : tlProfileData.tlCode
                          }).save().then(tladminNotificationData=>{
                              res.json({
                                  auth : {success : true},
                                  profile : {success : true},
                                  notification : {success : true}
                              })
                          }).catch(err=>res.json({error : err}))
                       }).catch(err=>res.json({error : err}))
                        
                    }).catch(err=>res.json({error : err}))
                }
        
            })
        }
    }).catch(err=>res.json({error : err}))
   }else{
       res.json({error : "you are not authenticated to perform this action"})
   }
})

// PATH         /api/tlauth/login
// ACCESS        PUBLIC
// ABOUT        logins teamleaders to app
router.post("/login",(req,res)=>{
  tlAuth.findOne({email : req.body.email}).then(data=>{
      if(!data)
      res.status(401).json({auth : "AUTH ERROR"});
    else{
        bcrypt.compare(req.body.password,data.password,(err,result)=>{
          if(err)
          res.status(401).json({auth : "AUTH ERROR"});
          
          if(result){

              tlProfile.findOne({tlCode : data.tlCode}).then(tlData=>{
                  jwt.sign({users : { 
                      tlCode : tlData.tlCode,
                      typeOfUser : tlData.typeOfUser,
                      isInit  : tlData.isInit
                  }},keys.secretOrKey,{ expiresIn : 6600} , (err,token)=>{
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

// PATH         /api/tlauth/current
// ACCESS        PRIVATE
// ABOUT        returns currently logged in teamLeader
router.get("/current",
passport.authenticate("jwt", { session: false }),
(req,res)=>{
res.json(req.user)
})


module.exports = router;