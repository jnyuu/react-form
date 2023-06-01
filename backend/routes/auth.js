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

            const token = jwt.sign(user.login, process.env.JWT_SECRET);

            userModel.updateOne({ login: user.login }, { token: token }).then(result => {
                const { matchedCount, modifiedCount } = result;
                if (matchedCount && modifiedCount) {
                    console.log(`Successfully updated the item.`)
                }
            })
                .catch(err => console.error(`Failed to update the item: ${err}`))

            res.cookie('token', token, { httpOnly: true });
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

            // generate a signed son web token with the contents of user object and return it in the response
            //https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
            const token = jwt.sign(user.login, process.env.JWT_SECRET);

            userModel.updateOne({ login: user.login }, { token: token }).then(result => {
                const { matchedCount, modifiedCount } = result;
                if (matchedCount && modifiedCount) {
                    console.log(`Successfully updated the item.`)
                }
            })
                .catch(err => console.error(`Failed to update the item: ${err}`))

            res.cookie('token', token, { httpOnly: true });
            return res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'))
        });
    })(req, res);
});

module.exports = router;