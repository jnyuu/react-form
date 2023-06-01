const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userModel = require("../models/user");

let cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['token'];
    return token;
};

router.post("/", async function (req, res, next) {

    const authToken = cookieExtractor(req)
    let decodedLogin;
    if (authToken) {
        try {
            decodedLogin = jwt.verify(authToken, process.env.JWT_SECRET)

        } catch (e) {
            console.log(e);
        }
    }

    // FIND USER BY LOGIN
    const userExists = await userModel.find({ login: decodedLogin })

    if (userExists.length > 0) {
        // user found
        // console.log("user found : " + userExists[0]);
        return res.json(userExists[0].ICPForm);
    } else {
        // user not found
        // console.log("user not found");
        return res.status(400).send({
            message: "user not found "
        });;
    }

});
module.exports = router;
