const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");   
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");

const adminAuth = mongoose.model("adminAuth");
const adminProfile = mongoose.model("admin");
const adminNotifications = mongoose.model("AdminNotifications");


const makeCode=()=> {
    var text = "";
    var possible =
      "0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

// PATH         /api/adminauth/test
// ACCESS        public
// ABOUT        testing adminAuth route
router.get("/test",(req,res)=>{
    res.json({msg:"admin Auth routes works"})
});

// PATH         /api/adminauth/register
// ACCESS        public
// ABOUT        adding a new admin 
router.post("/register",(req,res)=>{
    adminAuth.findOne({email : req.body.email}).then(admin =>{
        if(admin){
            res.status(409).json({email : "this emailId already exists"})
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err)
                res.status(500).json(err)
                else{
                    const newAdminAuth = new adminAuth({
                        email : req.body.email,
                        password : hash,
                        adminCode : "AD"+makeCode()
                    })
                    flag = false;
                    do {
                        adminAuth.find({ adminCode: newAdminAuth.adminCode }).then(data => {
                          if (data) {
                            if (data.length > 0) {
                              flag = true;
                              newAdminAuth.adminCode = "AD" + makeCode();
                            } else {
                              flag = false;
                            }
                          } else {
                            flag = false;
                          }
                        });
                      } while (flag);
        
                    newAdminAuth.save().then(adminAuthData=>{
                       //creating admin profile

                        new adminProfile({
                           name : req.body.name,
                           email : adminAuthData.email,
                           authId : adminAuthData._id,
                           adminCode : adminAuthData.adminCode
                       }).save().then(adminProfileData =>{

                        //create admin notifications

                          new adminNotifications({
                              adminCode : adminProfileData.adminCode
                          }).save().then(adminNotificationData=>{
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
    }).catch(err=>res.json(err))
});

// PATH         /api/adminauth/login
// ACCESS        public
// ABOUT        Login admin to app
router.post("/login",(req,res)=>{
  
    adminAuth.findOne({email : req.body.email}).then(data=>{
        if(!data)
        res.status(401).json({auth : "AUTH ERROR"});
      else{
          bcrypt.compare(req.body.password,data.password,(err,result)=>{
            if(err)
            res.status(401).json({auth : "AUTH ERROR"});
            
            if(result){

                adminProfile.findOne({adminCode : data.adminCode}).then(adminData=>{
                    jwt.sign({users : { 
                        adminCode : adminData.adminCode,
                        typeOfUser : adminData.typeOfUser
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

// PATH         /api/adminauth/current
// ACCESS        PRIVATE
// ABOUT        returns the currently logged in admin 
router.get("/current",
passport.authenticate("jwt", { session: false }),
(req,res)=>{
if(req.user.typeOfUser === "admin"){
  res.json({
    name: req.user.name,
    email: req.user.email,
    adminCode : req.user.adminCode,
    typeOfUser : req.user.typeOfUser
})
}else{
  res.json({error : "no admin has logged in "})
}
})


module.exports = router;