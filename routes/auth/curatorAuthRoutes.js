const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");   
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");

const curatorAuth = mongoose.model("curatorAuth");
const curatorProfile= mongoose.model("curator");
const curatorNotifications = mongoose.model("curatorNotifications");

const tlAuth = mongoose.model("TLAuth");
const tlProfile = mongoose.model("teamLeader");

const makeCode=()=> {
    var text = "";
    var possible =
      "0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  // PATH         /api/curatorauth/test
// ACCESS        public
// ABOUT        testing curatorauth route
  router.get("/test",(req,res)=>{
    res.json({msg:"Curator Auth routes works"})
});

// PATH         /api/curatorAuth/adminregister
// ACCESS        PRIVATE
// ABOUT        adding curators by admin
router.post("/adminregister",
passport.authenticate("jwt", { session: false }),
(req,res)=>{
   if(req.user.typeOfUser === "admin"){


    tlAuth.findOne({tlCode : req.body.tlCode }).then(tlData=>{
      if(tlData){
        curatorAuth.findOne({email : req.body.email}).then(tl=>{
          if(tl){
              res.status(409).json({email : "this emailId already exists"})
          }else{
              bcrypt.hash(req.body.password,10,(err,hash)=>{
                  if(err)
                  res.status(500).json(err)
                  else{
                      const newCuratorAuth = new curatorAuth({
                          email : req.body.email,
                          password : hash,
                          curatorCode : "CU"+makeCode()
                      })
                      flag = false;
                      do {
                          curatorAuth.find({ curatorCode: newCuratorAuth.curatorCode }).then(data => {
                            if (data) {
                              if (data.length > 0) {
                                flag = true;
                                newCuratorAuth.curatorCode = "CU" + makeCode();
                              } else {
                                flag = false;
                              }
                            } else {
                              flag = false;
                            }
                          });
                        } while (flag);
          
                      newCuratorAuth.save().then(curatorAuthData=>{
                         //creating TL profile
  
                          new curatorProfile({
                             name : req.body.name,
                             email : curatorAuthData.email,
                             authId : curatorAuthData._id,
                             tlCode : req.body.tlCode,
                             curatorCode : curatorAuthData.curatorCode,
                             isVerified : true
                         }).save().then(curatorProfileData =>{
  
                          //create tl notifications
  
                            new curatorNotifications({
                              curatorCode : curatorProfileData.curatorCode,
                          }).save().then(curatoradminNotificationData=>{       
                            const curatorCode = curatoradminNotificationData.curatorCode;
                            tlProfile.findOneAndUpdate({tlCode : req.body.tlCode},{$push:{curators : {curatorCode : curatorCode}}}).then(cdata=>{
                              res.json({
                                auth : {success : true},
                                profile : {success : true},
                                notification : {success : true}
                            })
                            }).catch(err=>res.json({error : err}))
                            }).catch(err=>res.json({error : err}))
                         }).catch(err=>res.json({error : err}))
                          
                      }).catch(err=>res.json({error : err}))
                  }
          
              })
          }
      }).catch(err=>res.json({error : err}))
      }else{
       res.json({error : "teamleader not recognized"})
      }
    })

    
   }else{
       res.json({error : "you are not authenticated to perform this action"})
   }
})


// PATH         /api/curatorAuth/tlregister
// ACCESS        PRIVATE
// ABOUT        adding curators by team leader
router.post("/tlregister",
passport.authenticate("jwt", { session: false }),
(req,res)=>{
   if(req.user.typeOfUser === "teamLeader"){


    tlAuth.findOne({tlCode : req.user.tlCode }).then(tlData=>{
      if(tlData){
        curatorAuth.findOne({email : req.body.email}).then(tl=>{
          if(tl){
              res.status(409).json({email : "this emailId already exists"})
          }else{
              bcrypt.hash(req.body.password,10,(err,hash)=>{
                  if(err)
                  res.status(500).json(err)
                  else{
                      const newCuratorAuth = new curatorAuth({
                          email : req.body.email,
                          password : hash,
                          curatorCode : "CU"+makeCode()
                      })
                      flag = false;
                      do {
                          curatorAuth.find({ curatorCode: newCuratorAuth.curatorCode }).then(data => {
                            if (data) {
                              if (data.length > 0) {
                                flag = true;
                                newCuratorAuth.curatorCode = "CU" + makeCode();
                              } else {
                                flag = false;
                              }
                            } else {
                              flag = false;
                            }
                          });
                        } while (flag);
          
                      newCuratorAuth.save().then(curatorAuthData=>{
                         //creating TL profile
  
                          new curatorProfile({
                             name : req.body.name,
                             email : curatorAuthData.email,
                             authId : curatorAuthData._id,
                             tlCode : req.user.tlCode,
                             curatorCode : curatorAuthData.curatorCode,
                             isVerified : true
                         }).save().then(curatorProfileData =>{
  
                          //create tl notifications
  
                            new curatorNotifications({
                              curatorCode : curatorProfileData.curatorCode,
                          }).save().then(curatoradminNotificationData=>{
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
       res.json({error : "teamleader not recognized"})
      }
    })

    
   }else{
       res.json({error : "you are not authenticated to perform this action"})
   }
})

// PATH         /api/curatorAuth/login
// ACCESS        PRIVATE
// ABOUT        login curators to app
router.post("/login",(req,res)=>{
  curatorAuth.findOne({email : req.body.email}).then(data=>{
      if(!data)
      res.status(401).json({auth : "AUTH ERROR"});
    else{
        bcrypt.compare(req.body.password,data.password,(err,result)=>{
          if(err)
          res.status(401).json({auth : "AUTH ERROR"});
          
          if(result){

              curatorProfile.findOne({curatorCode : data.curatorCode}).then(curatorData=>{
                
                const users = {...curatorData._doc,
                                authId : null}; 

                  jwt.sign({users},keys.secretOrKey,{ expiresIn : 6600} , (err,token)=>{
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

// PATH         /api/curatorAuth/current
// ACCESS        PRIVATE
// ABOUT        returns admin currently loggedIn
router.get("/current",
passport.authenticate("jwt", { session: false }),
(req,res)=>{
res.json(req.user)
})

// PATH         /api/curatorAuth/changepassword
// ACCESS        PRIVATE
// ABOUT        changes the curator password
router.post("/changepassword",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
  
  
  curatorAuth.findOne({curatorCode : req.user.curatorCode}).then(
    curatorData=>{
      bcrypt.compare(req.body.oldPassword,curatorData.password,(err,result)=>{
        if(err)
        res.status(401).json({auth : "AUTH ERROR"});
        
        if(result){

           if(req.body.password1 === req.body.password2){
            bcrypt.hash(req.body.password1,10,(err,hash)=>{
              if(err)
              res.status(500).json(err)
              else{
                curatorAuth.findOneAndUpdate({curatorCode : req.user.curatorCode},{$set:{password : hash}},{new : true})
                .then(updatedCuratorData=>{
                  res.json(updatedCuratorData)
                })
                .catch(err=>res.json({error : err}))
              }
            })

           }else{
             res.status(401).json({auth : "password didnt match"});
           }

        }else{
            res.status(401).json({auth : "old password error"});
        }

      })
    }
  ).catch(err=>{res.json({error : err})})
})


module.exports = router;