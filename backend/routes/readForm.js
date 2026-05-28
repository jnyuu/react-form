const express = require('express');
const router = express.Router();
require('dotenv').config();
const userModel = require("../models/user");

router.post("/", async function (req, res, next) {
    if (!req.user) return res.status(401).send({ message: 'Unauthorized' });
    try {
        const user = await userModel.findById(req.user._id).lean();
        if (!user) return res.status(400).send({ message: 'user not found' });
        return res.json(user.formData);
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Server error' });
    }
});
module.exports = router;
