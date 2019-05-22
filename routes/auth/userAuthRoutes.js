const express = require("express");
const router = express.Router();
const passport = require("passport");

const mongoose = require("mongoose");   
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");
const User = mongoose.model("User");

router.get("/test",(req,res)=>{
    res.json({message  : "user auth test route works "})
})

router.get("/glogin",(req,res,next)=>{
    passport.authenticate("google", { scope: ["profile", "email"] })(
        req,
        res,
        next
      );
})

router.get('/google/callback', 
  passport.authenticate('google'),
  (req, res)=> {
      
    jwt.sign({...req.user} ,keys.secretOrKey,{ expiresIn : 6600} , (err,token)=>{
        res.json({success : true, token:"Bearer "+token})
      })

      res.redirect("/");
  });

  router.get("/current",(req,res)=>{
      if(!req.user)
      res.json({success : false});
    else{
        User.findById(req.user._id).then(userData=>{
            jwt.sign({users : userData} ,keys.secretOrKey,{ expiresIn : 6600} , (err,token)=>{
                res.json({success : true, token:"Bearer "+token})
              })
        })

          

    }
      
      
  })

  router.get("/logout", (req, res) => {
    req.logOut();  
    res.json({ user: req.user});
  });

module.exports = router;