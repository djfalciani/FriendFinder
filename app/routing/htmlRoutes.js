var express = require('express')
var path = require("path");
var router = express.Router()

// Routes
// =============================================================
// define the home page route
router.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, "/home.html"));
    res.sendFile(path.join(__dirname, "../public", "home.html"));
})

router.get("/:page", function(req, res) {
    // stash the url in a variable...
    let thePage = req.params.page.toLowerCase()
    switch (thePage) {
        case 'survey' :
            return res.sendFile(path.join(__dirname, "../public","/survey.html"));
            default :
            return res.sendFile(path.join(__dirname, "../public","/home.html"));
    }
});


module.exports = router