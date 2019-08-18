const friends = require("../data/friends")

module.exports = function(app) {
    // =============================================================
    // Routes
    // =============================================================
    app.get("/api/friends", function(req, res) {
        return res.json(friends);
    });

    // Post
    app.post("/api/friends", function(req,res) {
        // Push data from UI into Friends array in the data folder...
        const newFriend = req.body;
        friends.push(newFriend);
        // res.json(true);
        res.json(newFriend);
    });

    // app.post("/api/reservation", function(req, res) {
    //     let newReservation = req.body
    //     if (tables.length < 5) tables.push(newReservation)
    //     else waitList.push(newReservation)
    //     res.json(newReservation)
    // })
    
    // app.post("/api/tables", function(req, res) {
    //     // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    //     // It will do this by sending out the value "true" have a table
    //     // req.body is available since we're using the body parsing middleware
    //     if (tableData.length < 5) {
    //       tableData.push(req.body);
    //       res.json(true);
    //     }
    //     else {
    //       waitListData.push(req.body);
    //       res.json(false);
    //     }
    //   });

};