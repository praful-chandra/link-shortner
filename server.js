const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require("path");

const connectDB = require("./config/db");
const config  = require("config");
const cookieKey = config.get("cookieKey");

//init mongoose models
require("./models/auth/curatorAuth");  
require("./models/users/curator");
require("./models/url/url");

//passport
require("./services/passport");

const curatorAuthRoutes = require("./routes/curatorAuth");
const urlRoutes = require("./routes/urlRoutes");
const urlRedirectRoute = require("./routes/redirectUrl");
  

const app = express();



const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`listening on port ${PORT}`));
//app.set('trust proxy', true);
//connect DB
connectDB();

// app.get("/",(req,res)=>{
//     res.json("welcome to infrnt-linkShortner");
// })

//body-parser
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//initalize passport with session
app.use(
    cookieSession({
      maxAge : 2*24*60*60*1000,
      keys : [cookieKey]
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());


  //Auth Routes
  app.use("/api/curatorAuth",curatorAuthRoutes);

  //url Routes
  app.use("/api/url",urlRoutes);

  //redirectURL
  app.use("/a",urlRedirectRoute);


  app.use(express.static(path.join(__dirname, 'client')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  });