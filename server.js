// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up everything within public folder...
app.use(express.static(path.join(__dirname,'public')));

// =============================================================
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/app","/public","/home.html"));
});

app.get("/:page", function(req, res) {
    // stash the url in a variable...
    let thePage = req.params.page.toLowerCase()
    switch (thePage) {
        case 'survey' :
            return res.sendFile(path.join(__dirname, "/app","/public","/survey.html"));
        default :
            return res.sendFile(path.join(__dirname, "/app","/public","/home.html"));
    }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});