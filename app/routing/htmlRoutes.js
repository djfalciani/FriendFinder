const path = require("path");

module.exports = function(app) {
    // Routes
    // =============================================================
    // define the home page route
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "../public", "home.html"));
    })
    
    app.get("/:page", function(req, res) {
        // stash the url in a variable...
        let thePage = req.params.page.toLowerCase()
        switch (thePage) {
            case 'survey' :
                return res.sendFile(path.join(__dirname, "../public","/survey.html"));
                default :
                return res.sendFile(path.join(__dirname, "../public","/home.html"));
        }
    });

    // If no matching route is found default to home
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

};