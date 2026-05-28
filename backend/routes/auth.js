const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const path = require('path');
require('dotenv').config();
const userModel = require("../models/user");

/* POST login. */

router.post('/initial-cookie-check', function (req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {

        // console.log("user login cookie check : " + user.login);

        if (err || !user) {
            console.log(err);
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            return res.sendStatus(200)
        });
    })(req, res);
});


router.post('/', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {

        // console.log("auth.js user.login : " + user.login);
        // console.log("auth.js user.login : " + user);

        if (err || !user) {
            console.log(err);
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const payload = { userId: user._id, login: user.login };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

            // store token in DB (optional) - keep for single-session tracking
            userModel.updateOne({ login: user.login }, { token: token }).catch(err => console.error(`Failed to update the item: ${err}`));

            const cookieOptions = {
                httpOnly: true,
                sameSite: 'lax'
            };
            if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

            res.cookie('token', token, cookieOptions);
            return res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'))
        });
    })(req, res);
});

router.get('/', function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {

        console.log("auth.js user.login : " + user.login);
        console.log("auth.js user.login : " + user);

        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const payload = { userId: user._id, login: user.login };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

            userModel.updateOne({ login: user.login }, { token: token }).catch(err => console.error(`Failed to update the item: ${err}`));

            const cookieOptions = {
                httpOnly: true,
                sameSite: 'lax'
            };
            if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

            res.cookie('token', token, cookieOptions);
            return res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'))
        });
    })(req, res);
});

module.exports = router;