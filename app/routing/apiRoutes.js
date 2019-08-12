var express = require('express')
var path = require("path");
var router = express.Router()
const friends = require("../data/friends")

// Routes
// =============================================================
router.get("/api/friends", function(req, res) {
    return res.json(friends);
});

module.exports = router