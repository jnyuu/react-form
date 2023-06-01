const express = require('express');
const router = express.Router();
const path = require('path');

router.post("/", function (req, res, next) {
    res.clearCookie("token");
    res.status(200)
    res.end()
});

module.exports = router;