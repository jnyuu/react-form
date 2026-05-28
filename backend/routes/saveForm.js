const express = require('express');
const router = express.Router();
require('dotenv').config();
const userModel = require("../models/user");

router.post("/", async function (req, res, next) {
    if (!req.user) return res.status(401).send('Unauthorized');

    try {
        await userModel.updateOne({ _id: req.user._id }, { $set: { formData: req.body } });
        return res.status(200).send('Form Saved');
    } catch (err) {
        console.error(`Failed to update the item: ${err}`);
        return res.status(500).send('Failed to save form');
    }
});

module.exports = router;
