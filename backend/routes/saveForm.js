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

    await userModel.updateOne({ login: decodedLogin }, { ICPForm: req.body }).then(result => {
        const { matchedCount, modifiedCount } = result;
        if (matchedCount && modifiedCount) {
            console.log(`Successfully updated the item.`)
        }
    })
        .catch((err) => {
            console.error(`Failed to update the item: ${err}`)
        })

    res.status(200)
    res.send("Form Saved");
});

module.exports = router;
