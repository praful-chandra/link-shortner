const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");   
var multer = require("multer");
const fs = require("fs");
const path = require("path");

 const writer = mongoose.model("writer");

const Blog = mongoose.model("blog");




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
    cb(null, "./uploads/writer/blogCover");
  },
  filename: function(req, file, cb) {
    cb(null, "cover" + makeid());
  }
});

var contentStorage = multer.diskStorage({
  
  destination: function(req, file, cb) {
    cb(null, "./uploads/writer/blogContent");
  },
  filename: function(req, file, cb) {
    cb(null, "content" + makeid());
  }
});

const MAX_SIZE = 10000000;

var coverUpload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: MAX_SIZE
  }
});

var contentUpload = multer({
  storage : contentStorage,
  fileFilter,
  limits:{
    fileSize : MAX_SIZE
  }
});


// PATH         /api/writer/test
// ACCESS        PUBLIC
// ABOUT        tests writer routes
router.get("/test",(req,res)=>{
    res.json({message : "writer route works"})
});


// PATH         /api/writer/addbloghead
// ACCESS       PRIVATE
// ABOUT        creates new blog under current writer and adds header
router.post("/addbloghead",
passport.authenticate("jwt",{session : false}),
coverUpload.single("cover"),
(req,res)=>{

  if(req.user.typeOfUser === "writer"){
    
    let newBlog = new Blog({
      title : req.body.title,
      description :  req.body.description,
      writerCode : req.user.writerCode,
      writerName : req.user.name,
      blogCode : "BL"+makeCode()
    });

    
    flag = false;
  
    do {
      Blog.find({ blogCode: newBlog.blogCode }).then(data => {
        if (data) {
          if (data.length > 0) {
            flag = true;
            newBlog.blogCode = "BL" +makeCode()
          } else {
            flag = false;
          }
        } else {
          flag = false;
        }
      });
    } while (flag);

    if(req.file){
      
      const newPath =
    "uploads/writer/blogCover/" +
    newBlog.blogCode +
    path.extname(req.file.originalname);


    fs.rename(req.file.path, newPath, function(err) {
      if (err) res.json( err);
    });

   newBlog.cover = "/api/"+newPath;
    }

    newBlog.save()
    .then(savedBlog =>{
     writer.findOneAndUpdate({writerCode : savedBlog.writerCode} , {$push :{"blogs" : {blogCode: savedBlog.blogCode }}} )
     .then(()=>{
       res.json({success : true , savedBlog})
     })
     .catch(err => res.json({error : err}))
    })
    .catch(err => res.json({error : err}));

  }else{
    res.json({error : "you are not authenticated to perform this action"});
  }

}
)


// PATH         /api/writer/addblogcontent
// ACCESS       PRIVATE
// ABOUT        updates the existing blog under writer and adds the content
router.post("/addblogcontent",
passport.authenticate("jwt",{session : false}),
contentUpload.single("contentImg"),
(req,res)=>{
  if(req.user.typeOfUser === "writer" ){
      writer.findOne({writerCode : req.user.writerCode})
      .then(retrivedWriter=>{        
      const writerCheck =   retrivedWriter.blogs.filter(bCode=>{  return bCode.blogCode === req.body.blogCode   })

      if(writerCheck.length < 1){
        res.json({error : "no blogs found from that ID"})
      } 

      })

      const newContent = {
        link : req.body.link,
        blogContent : req.body.blogContent,
        styleCode : req.body.styleCode,
        _id : mongoose.Types.ObjectId(),
        img : ""
      }

      

      const blogContentPath = "uploads/writer/blogContent/"+req.body.blogCode;

      if(!fs.existsSync(blogContentPath)){

        fs.mkdirSync(blogContentPath)
        
      }


      if(req.file){
        
        const newPath =
      "uploads/writer/blogContent/" +
      req.body.blogCode + "/"+ newContent._id+
      path.extname(req.file.originalname);
  
      
      fs.rename(req.file.path, newPath, function(err) {
        if (err) res.json( err);
      });
  
     newContent.img = "/api/" + newPath;
      }

      Blog.findOneAndUpdate({blogCode : req.body.blogCode} , {$push : {content : newContent}} ,{new : true})
      .then((updatedBlog)=>{
        res.json({success : true , updatedBlog})
      })
      .catch(error => res.json(error))



     
  }else{
    res.json({error : "you are not authenticated to perform this action"});
  }
})

// PATH         /api/writer/writerBlogs
// ACCESS       PRIVATE
// ABOUT        returns all the blogs of current writer
router.post("/writerblogs",
passport.authenticate("jwt",{session : false}),
(req,res)=>{
  if(req.user.typeOfUser  === "writer"){
      Blog.find({writerCode : req.user.writerCode}).sort({date :-1}).then(blogData=>{
        res.json({success : true , blogs : blogData})
      }).catch(err=>res.json({error : err}))
  }else{
    res.json({error : "you are not authenticated to perform this action"})
  }
})

module.exports = router;