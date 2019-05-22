const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");   
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");

const writerAuth = mongoose.model("WriterAuth");
const writerProfile = mongoose.model("writer");
const writerNotification = mongoose.model("writerNotifications")

const tlAuth = mongoose.model("TLAuth");
const tlProfile= mongoose.model("teamLeader");



const makeCode=()=> {
    var text = "";
    var possible =
      "0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

// PATH         /api/writerauth/test
// ACCESS        PUBLIC
// ABOUT        tests writer auth routes
  router.get("/test",(req,res)=>{
    res.json({msg:"Writer Auth routes works"})
});

// PATH         /api/writerauth/adminregister
// ACCESS        PRIVATE
// ABOUT        adds writers by admin
router.post("/adminregister",
passport.authenticate("jwt", { session: false }),
(req,res)=>{
    if(req.user.typeOfUser === "admin"){
      tlAuth.findOne({tlCode : req.body.tlCode }).then(tlData=>{
        if(tlData){
        writerAuth.findOne({email : req.body.email}).then(tl=>{
        if(tl){
            res.status(409).json({email : "this emailId already exists"})
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err)
                res.status(500).json(err)
                else{
                    const newWriterAuth = new writerAuth({
                        email : req.body.email,
                        password : hash,
                        writerCode : "WR"+makeCode()
                    })
                    flag = false;
                    do {
                        writerAuth.find({ writerCode: newWriterAuth.writerCode }).then(data => {
                          if (data) {
                            if (data.length > 0) {
                              flag = true;
                              newWriterAuth.writerCode = "WR" + makeCode();
                            } else {
                              flag = false;
                            }
                          } else {
                            flag = false;
                          }
                        });
                      } while (flag);

                    newWriterAuth.save().then(writerAuthData=>{
                       //creating writer profile

                       const temp = new writerProfile({
                           name : req.body.name,
                           email : writerAuthData.email,
                           authId : writerAuthData._id,
                           writerCode : writerAuthData.writerCode,
                           tlCode : req.body.tlCode,
                           isVerified : true 
                       })

                       temp.save().then(writerProfileData =>{
                            
                        //create writer notifications

                          new writerNotification({
                              writerCode : writerProfileData.writerCode
                          }).save().then(writeradminNotificationData=>{
                            const writerCode = writeradminNotificationData.writerCode;  

                            tlProfile.findOneAndUpdate({tlCode : req.body.tlCode},{$push:{writers : {writerCode : writerCode}}}).then(cdata=>{
                              res.json({
                                auth : {success : true},
                                profile : {success : true},
                                notification : {success : true}  
                            }).catch(err=>res.json({error : err}))
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

// PATH         /api/writerauth/tlregister
// ACCESS        PRIVATE
// ABOUT        adds writers by teamleaders
router.post("/tlregister",
passport.authenticate("jwt", { session: false }),
(req,res)=>{
    if(req.user.typeOfUser === "teamLeader"){
      tlAuth.findOne({tlCode : req.user.tlCode }).then(tlData=>{
        if(tlData){
        writerAuth.findOne({email : req.body.email}).then(tl=>{
        if(tl){
            res.status(409).json({email : "this emailId already exists"})
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err)
                res.status(500).json(err)
                else{
                    const newWriterAuth = new writerAuth({
                        email : req.body.email,
                        password : hash,
                        writerCode : "WR"+makeCode()
                    })
                    flag = false;
                    do {
                        writerAuth.find({ writerCode: newWriterAuth.writerCode }).then(data => {
                          if (data) {
                            if (data.length > 0) {
                              flag = true;
                              newWriterAuth.writerCode = "WR" + makeCode();
                            } else {
                              flag = false;
                            }
                          } else {
                            flag = false;
                          }
                        });
                      } while (flag);

                    newWriterAuth.save().then(writerAuthData=>{
                       //creating writer profile

                       const temp = new writerProfile({
                           name : req.body.name,
                           email : writerAuthData.email,
                           authId : writerAuthData._id,
                           writerCode : writerAuthData.writerCode,
                           tlCode : req.user.tlCode,
                           isVerified : true 
                       })

                       temp.save().then(writerProfileData =>{
                            
                        //create writer notifications

                          new writerNotification({
                              writerCode : writerProfileData.writerCode
                          }).save().then(writeradminNotificationData=>{
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

// PATH         /api/writerauth/login
// ACCESS        PUBLIC
// ABOUT        log in writer to app
router.post("/login",(req,res)=>{
    writerAuth.findOne({email : req.body.email}).then(data=>{
        if(!data)
        res.status(401).json({auth : "AUTH ERROR"});
      else{
          bcrypt.compare(req.body.password,data.password,(err,result)=>{
            if(err)
            res.status(401).json({auth : "AUTH ERROR"});
            
            if(result){

                writerProfile.findOne({writerCode : data.writerCode}).then(writerData=>{
                  const users = {...writerData._doc,
                    authId : null}; 
                    jwt.sign({users },keys.secretOrKey,{ expiresIn : 6600} , (err,token)=>{
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

// PATH         /api/writerauth/current
// ACCESS        PRIVATE
// ABOUT        returns currently logged in writer
router.get("/current",
passport.authenticate("jwt", { session: false }),
(req,res)=>{
res.json(req.user)
})





module.exports = router;