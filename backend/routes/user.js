const express = require('express');
const router = express.Router();
const userModel = require("../models/user");

router.post("/add-user", async (request, response) => {
    console.log("add user");

    const user = new userModel(request.body);
    try {
        await user.save();
        response.send(user);
    } catch (err) {
        console.log(err);
        response.status(500).send(err);
    }
});


module.exports = router;
