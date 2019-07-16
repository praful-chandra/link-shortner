const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

const curatorProfile = mongoose.model("curator");

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((id, done) => {
    done(null, id);
  });

  const config = require("config");
  const secretOrKey = config.get("secretOrKey");

  const authHeader = extractJwt.fromAuthHeaderAsBearerToken();

  const opts={}
  opts.secretOrKey = secretOrKey;
  opts.jwtFromRequest = authHeader;

  passport.use(
      new JwtStrategy(opts,(jwtPayload , done)=>{
          if(jwtPayload.users.typeOfUser === "curator"){
              curatorProfile.findOne({curatorCode : jwtPayload.users.curatorCode}).then(user => {
                if (user) {
                  return done(null, user);
                }
                return done(null, false);
              })
              .catch(err => console.log(err));
          }else{
              return(done,false)
          }
      }
      
      )
  );