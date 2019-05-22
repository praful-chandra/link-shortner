const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");   

var multer = require("multer");
const fs = require("fs");
const path = require("path");



const Curator = mongoose.model("curator");
const curatorStyles = mongoose.model("curatorStyles");
const curatorStyleDesigns = mongoose.model("curatorStyleDesign");

const fileFilter = (req, file, next) => {
  
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error("file type not supported");
      error.code = "UNSUPPORTED_FILE";
      return next(error, false);
    } else next(null, true);
  };
  
  function makeid() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  const makeCode=()=> {
    var text = "";
    var possible =
      "0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  
  var storage = multer.diskStorage({
    
    destination: function(req, file, cb) {
      cb(null, "./uploads/curator/avatar");
    },
    filename: function(req, file, cb) {
      cb(null, "avatar" + makeid());
    }
  });

  var styleStorage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads/curator/styles");
    },
    filename: function(req, file, cb) {
      cb(null, "styleCover" + makeid());
    }
  });

  var designStorage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "./uploads/curator/styles/designs");
    },
    filename: function(req, file, cb) {
      cb(null, "designCover" + makeid());
    }
  });

  const MAX_SIZE = 10000000;

  var upload = multer({
    storage: storage,
    fileFilter,
    limits: {
      fileSize: MAX_SIZE
    }
  });

  var styleUpload = multer({
    storage: styleStorage,
    fileFilter,
    limits: {
      fileSize: MAX_SIZE
    }
  });
  
  var designUpload = multer({
    storage: designStorage,
    fileFilter,
    limits: {
      fileSize: MAX_SIZE
    }
  });


// PATH         /api/curator/test
// ACCESS        PUBLIC
// ABOUT        tests curator route
router.get("/test",(req,res)=>{
    res.json({message : "curator route works"})
})


// PATH         /api/curator/updateProfile
// ACCESS        PRIVATE
// ABOUT        updates the profile of curator
router.post('/updateProfile',
passport.authenticate("jwt", { session: false }),
upload.single("avatar"),
(req,res)=>{
  if (req.user.typeOfUser !== "curator") {
    res
      .status(401)
      .json({ msg: "Your are not authenticated to perform this action" });
  } else if (req.user.typeOfUser === "curator") {

    if(req.file){
      const newPath =
    "uploads/curator/avatar/" +
    req.user.curatorCode +
    path.extname(req.file.originalname);

    
    fs.rename(req.file.path, newPath, function(err) {
      if (err) res.json( err);
    });

    Curator.findOneAndUpdate({curatorCode : req.user.curatorCode}, {$set:{avatar : "/api/"+newPath} },{new: true}).then(Curator=>{
    })
    }

Curator.findOneAndUpdate({curatorCode : req.user.curatorCode}, {$set:{profile:req.body.profile}} ,{new: true}).then(Curator=>{  
  res.json({success : true , Curator})
})
    
  }

  
})


// PATH         /api/curator/addStyle
// ACCESS        PRIVATE
// ABOUT        adds a new style under current curator
router.post(
    "/addStyle",
    passport.authenticate("jwt", { session: false }),
    styleUpload.single("styleCover"),
    (req, res) => {
      if (req.user.typeOfUser !== "curator") {
        res
          .status(401)
          .json({ msg: "Your are not authorized to perform this action" });
      } else if (req.user.typeOfUser === "curator") {
        let newStyle = new curatorStyles({
          curatorCode: req.user.curatorCode,
          name: req.body.name,
          description: req.body.description,
          styleCode: "ST" +makeCode()
        });
  
       
  
        flag = false;
  
        do {
          curatorStyles.find({ styleCode: newStyle.styleCode }).then(data => {
            if (data) {
              if (data.length > 0) {
                flag = true;
                newStyle.styleCode = "ST" +makeCode()
              } else {
                flag = false;
              }
            } else {
              flag = false;
            }
          });
        } while (flag);

        if (req.file) {
            const newPath =
              "uploads/curator/styles/" +
              newStyle.styleCode +
              path.extname(req.file.originalname);
    
            fs.rename(req.file.path, newPath, function(err) {
              if (err) res.json(err);
            });
    
            newStyle.coverImg = "api/" + newPath;
          }
  
        newStyle.save().then(data => {
          Curator.findOneAndUpdate(
            {
                curatorCode : req.user.curatorCode
            },
            { $push: { styles: { styleCode : newStyle.styleCode} } },
            { new: true }
          ).then(Curator => {
           curatorStyles.find({curatorCode : Curator.curatorCode}).then(curatorStyleData=>{
           res.json({success :true , styles : curatorStyleData});

           })
          });
        });
      }
    }
  );



// PATH         /api/curator/adddesign
// ACCESS        PRIVATE
// ABOUT        adds a new design under current curator and specified style
  router.post(
    "/adddesign",
    passport.authenticate("jwt", { session: false }),
    designUpload.single("designCover"),
    (req, res) => {
      if (req.user.typeOfUser !== "curator") {
        res
          .status(401)
          .json({ msg: "Your are not authenticated to perform this action" });
      } else if (req.user.typeOfUser === "curator") {
         let avaliableSize = req.body.avaliableSize.split(",");
         let productDetails = req.body.productDetails.split(",");

        let newDesign = new curatorStyleDesigns({
          styleCode: req.body.styleCode,
          curatorCode: req.user.curatorCode,
          title: req.body.title,
          description: req.body.description,
          label: req.body.label || "no label",
          designCode: "DS" + makeCode(),
          avaliableSize,
          productDetails,
          price : req.body.price,
          modelSize : req.body.modelSize
        });
  
        
  
        flag = false;
  
        do {
          curatorStyleDesigns
            .find({ designCode: newDesign.designCode })
            .then(data => {
              if (data) {
                if (data.length > 0) {
                  flag = true;
                  newDesign.designCode = "DS" + makeCode();
                } else {
                  flag = false;
                }
              } else {
                flag = false;
              }
            });
        } while (flag);

        if (req.file) {
            const newPath =
              "uploads/curator/styles/designs/" +
              newDesign.designCode +
              path.extname(req.file.originalname);
    
            fs.rename(req.file.path, newPath, function(err) {
              if (err) res.json(err);
            });
    
            newDesign.coverImg = "/api/" + newPath;
          }
  
        newDesign
          .save()
          .then(design => {
            curatorStyles
              .findOneAndUpdate(
               {
                   styleCode : design.styleCode
               },
                { $push: { Designs: { designCode :design.designCode} }},
                { new: true }
              )
              .then(style => {
                Curator.findOneAndUpdate(
                  {
                      curatorCode : req.user.curatorCode
                  },
                  { $push: { designs: { designCode : newDesign.designCode} } },
                  { new: true }
                ).then(Curator => {
                 curatorStyleDesigns.find({curatorCode : Curator.curatorCode}).then(curatorDesignData=>{
                 res.json({success :true , designs : curatorDesignData});
      
                 })
                });
              });
          })
          .catch(err => res.json(err));
      }
    }
  );


  // PATH         /api/curator/mystyles
// ACCESS        PRIVATE
// ABOUT        returns all the styles under current curator
  router.get("/mystyles",
  passport.authenticate("jwt",{session : false}),
  (req,res)=>{
    if(req.user.typeOfUser === "curator"){
      curatorStyles.find({curatorCode : req.user.curatorCode}).then(
        styleData=>{
          res.json({success : true , styles : styleData })
        }
      )
      .catch(err=>res.json({error : err}))
    }else{
      res.json({msg: "you are not authenticated to perform this action"})
    }
  })

// PATH         /api/curator/myDesigns
// ACCESS        PRIVATE
// ABOUT        returns all the designs under current curator
router.get("/mydesigns",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
  if(req.user.typeOfUser === "curator"){
    curatorStyleDesigns.find({curatorCode : req.user.curatorCode}).then(
      designData=>{
        res.json({success : true , designs : designData })
      }
    )
    .catch(err=>res.json({error : err}))
  }else{
    res.json({msg: "you are not authenticated to perform this action"})
  }
})

// PATH         /api/curator/removeStyle
// ACCESS        PRIVATE
// ABOUT        removes a  style under current curator
  router.delete("/removestyle",
  passport.authenticate("jwt",{session : false}),
  (req,res)=>{
    if(req.user.typeOfUser === "curator"){
      const styleCode = req.body.styleCode;

      curatorStyles.find({styleCode ,curatorCode : req.user.curatorCode}).then(
        styleData=>{
          if(styleData.length >0){
            res.json(styleData)
          }else{
            res.json({error : "style code / permission error"})
          }
        }
      ).catch(err=>res.json({error : err}))
    }else{
      res.json({msg : "you are not authenticated to perform this action"})
    }
  });




module.exports = router;