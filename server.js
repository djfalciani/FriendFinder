// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const friends = require("./app/data/friends.js");
var htmlRoutes = require("./app/routing/htmlRoutes")

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
app.use('/',htmlRoutes);

app.get("/api/friends", function(req, res) {
    res.sendFile(path.join(__dirname, "/app","/public","/home.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    console.log(friends);
});