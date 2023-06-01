const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const userModel = require("./models/user");

let cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['token'];
    return token;
};

passport.use(new LocalStrategy(

    async function (login, password, cb) {

        let user
        const userExists = await userModel.find({ login: login })
        if (userExists.length > 0) {
            // user found
            console.log("user found passport.js");
            // console.log("user found : " + userExists[0]);
            user = userExists[0]

        } else {
            // user not found
            console.log("user not found");
        }

        if (user.password === password) {
            console.log("correct password");
            return cb(null, user, { message: 'Logged In Successfully' });
        } else {
            return cb(null, false, { message: 'Incorrect login or password.' });
        }


    }
));


passport.use(new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET
},
    async function (jwtPayload, cb) {
        let user
        const userExists = await userModel.find({ login: jwtPayload })
        if (userExists.length > 0) {
            // user found
            console.log("user found passport.js ");
            user = userExists[0]

        } else {
            // user not found
            console.log("user not found");
        }
        if (user) {
            cb(null, user);
        } else {
            cb(null, false);
        }
    }
));
