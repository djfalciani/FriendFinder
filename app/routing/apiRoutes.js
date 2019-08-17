const friends = require("../data/friends")

module.exports = function(app) {
    // =============================================================
    // Routes
    // =============================================================
    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    });

};