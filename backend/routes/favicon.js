const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function (req, res, next) {
    res.status(204)
    res.sendFile(path.join(__dirname, '..', '..', 'build', 'img', "favicon.ico"));
});

module.exports = router;
