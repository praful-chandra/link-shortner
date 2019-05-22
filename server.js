const express = require("express");
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

const path = require('path');



//initialize mongoose models

//adminModels
require("./models/auth/adminAuth");
require("./models/notifications/adminNotifications");
require("./models/users/admin");

//teamLeader models
require("./models/auth/teamLeaderAuth");
require("./models/notifications/teamLeaderNotificaions");
require("./models/users/teamleader");

//curator models
require("./models/auth/curatorAuth");
require("./models/users/curator");
require("./models/notifications/curatorNotifications");

//writer models
require("./models/auth/writerAuth");
require("./models/notifications/writerNotifications");
require("./models/users/writer");

//content models
require("./models/content/curatorStyles");
require("./models/content/curatorStyleDesigns");
require("./models/content/blogs");

//user Models
require("./models/users/user");

require("./services/passport"); 

//create express app
const app = express();



//import user routes

//auth routes
const adminAuthRoutes = require("./routes/auth/adminAuthRoutes");
const teamLeaderAuthRoutes = require("./routes/auth/teamLeaderAuthRoutes");
const curatorAuthRoutes = require("./routes/auth/curatorAuthRoutes");
const writerAuthRoutes = require("./routes/auth/writerAuthRoutes");
const userAuthRoutes = require("./routes/auth/userAuthRoutes");
//user Routes
const adminRoutes = require("./routes/users/adminRoutes");
const tlRoutes = require("./routes/users/tlRoutes");
const curatorRoutes = require("./routes/users/curatorRoutes");
const writerRoutes = require("./routes/users/writerRoutes");    
const userRoutes = require("./routes/users/userRoutes");
//content Routes
const blogRoute = require("./routes/content/blogRoutes");
const styleRoutes = require("./routes/content/styleRoutes");
const designRoutes = require("./routes/content/designRoutes");

//set port to listen
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

//Body parser middleware
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//initalize mongoose
const db = keys.mongoURI; 
mongoose.connect(db,{ useNewUrlParser: true }).then(()=>console.log("mongoDB connected")).catch(err=>console.log({error :err}));

//initalize passport with session
app.use(
  cookieSession({
    maxAge : 2*24*60*60*1000,
    keys : [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//initalize body-parser
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//root route
app.get("/", (req, res) => {
  res.json({ message: "welcome to infrnt" });
});

app.use("/api/uploads",express.static('uploads'));


//user routes

app.use("/api/adminAuth",adminAuthRoutes)
app.use("/api/tlauth",teamLeaderAuthRoutes);
app.use("/api/curatorauth",curatorAuthRoutes);
app.use("/api/writerauth",writerAuthRoutes);
app.use("/api/userAuth",userAuthRoutes);

app.use("/api/admin",adminRoutes);
app.use("/api/tl",tlRoutes);
app.use("/api/curator",curatorRoutes);
app.use("/api/writer",writerRoutes);
app.use("/api/user",userRoutes);

app.use("/api/blog",blogRoute);
app.use("/api/style",styleRoutes);
app.use("/api/design",designRoutes);

// serve static routes to client
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
