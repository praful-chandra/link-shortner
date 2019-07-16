const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const geoip = require('geoip-lite');
const config = require("config");

const baseURL = config.get("baseURL");

const URL = mongoose.model("url");

//PATH : /a/test
//ACCESS : PUBLIC
//DESC : test route
router.get("/test",
(req,res)=>{
    
    res.json("url redirect route works")
}
)

//PATH : /a/<shorturl>
//ACCESS : PUBLIC
//DESC : redirect to long url

router.get("/:shortUrl",
(req,res)=>{
    if(req.query.ip){
      //  console.log(req.query);
  const ipCountry =   geoip.lookup(req.query.ip).country;
  const device = req.query.platform;
 const shortUrl = baseURL+ req.params.shortUrl;
  
 URL.findOne({shortUrl}).then(urlData=>{
     if(!urlData){
         res.json("no links found")
     }else{
         let dt = new Date();

         const accessData={
            day : dt.getDate(),
            month: (dt.getMonth() + 1),
            year : (dt.getFullYear()),
            device,
            location : ipCountry
         }

         URL.findOneAndUpdate({shortUrl : urlData.shortUrl},{$push:{accessed : accessData}},{new : true}).then((updatedData)=>{
 res.redirect(urlData.longUrl)
         }

         )
        
     }
 })
    
    }else
    res.sendFile('./getuserInfo.html', {root: __dirname ,name : "somenmame"})
})


  
module.exports = router;
