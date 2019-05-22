const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const Admin = mongoose.model("admin");
const Writer = mongoose.model("writer");
const Curator = mongoose.model("curator");
const TeamLeader = mongoose.model("teamLeader");
const User = mongoose.model("User")

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/api/userauth/google/callback"
    },
    (accessToken, refershToken, profile, done) => {
      
      User.findOne({provider : "google",providerId : profile.id}).then(userData=>{
        if(userData){
         return done(null,userData);
        }else{

          

          let newUser = new User({
            provider : "google",
            providerId : profile.id,
            name : profile.displayName,
            gender : profile.gender || "",
            email :  "",
            avatar : profile.photos[0].value || "/api/uploads/user/defaultAvatar.png"
          })

          if(profile.emails){
            newUser.email = profile.emails[0].value
          }

          newUser.save().then(res=>{
         return   done(null,res)
          }).catch(

            err=> done(err)
          )
        }
      })
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.FACEBOOK_APP_ID,
      clientSecret: keys.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, profile);
      //console.log(profile+"***");
    }
  )
);

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

passport.use(
  new JwtStrategy(opts, (jwtPayload, done) => {
    if (jwtPayload.users.typeOfUser == "user") {
      User.findById(jwtPayload.users._id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    } else if (jwtPayload.users.typeOfUser == "curator") {      
      Curator.findOne({curatorCode : jwtPayload.users.curatorCode})
        .then(curator => {
          if (curator) {
            return done(null, curator);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    } else if (jwtPayload.users.typeOfUser === "admin") {
      Admin.findOne({adminCode : jwtPayload.users.adminCode})
        .then(admin => {
          if (admin) {
            return done(null, admin);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    }
    else if (jwtPayload.users.typeOfUser === "writer") {
      Writer.findOne({writerCode : jwtPayload.users.writerCode})
        .then(writer => {
          if (writer) {
            return done(null, writer);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    }
    else if (jwtPayload.users.typeOfUser === "teamLeader") {
      TeamLeader.findOne({tlCode : jwtPayload.users.tlCode})
        .then(writer => {
          if (writer) {
            return done(null, writer);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    }
    else{
      return(done(null,false));
    }
  })
);
