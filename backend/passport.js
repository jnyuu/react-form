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
        try {
            const user = await userModel.findOne({ login: login });
            if (!user) return cb(null, false, { message: 'Incorrect login or password.' });

            const match = await user.comparePassword(password);
            if (!match) return cb(null, false, { message: 'Incorrect login or password.' });

            return cb(null, user, { message: 'Logged In Successfully' });
        } catch (err) {
            return cb(err);
        }
    }
));


passport.use(new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET
},
    async function (jwtPayload, cb) {
        try {
            // expect payload to be an object { userId, login }
            const id = jwtPayload && (jwtPayload.userId || jwtPayload.id);
            if (!id) return cb(null, false);
            const user = await userModel.findById(id);
            if (user) return cb(null, user);
            return cb(null, false);
        } catch (err) {
            return cb(err, false);
        }
    }
));
