//Require modules and models

var express = require("express");
var models = require("./models/index");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

//Set view engine

app.set("view engine", "ejs");

//Middleware

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

app.get("/", function(req, res) {
    res.redirect(301, "/chirps");
});

//Get all chirps
app.get("/chirps", (req, res) => {
  // Step 1: Retrieve all chirps from the database
  // Step 2: Create HTML based on the data received
  // Step 3: Send back the completed HTML to the browser for consumption
  models.Chirp.findAll().then((chirps) => {
    res.render("index", { chirps });
  });
  // To see website: Visit http://localhost:3000/chirps
});

//Get specific chirp

//Edit a chirp

//Delete a chirp

app.listen(process.env.PORT || 3000);
