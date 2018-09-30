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

//Create new chirp
app.post("/chirps", (req, res) => {
  // Step 1: Retrieve new chirp text from the form submission
  // Step 2: Save new chirp as record in the database
  // Step 3: Redirect back to show all chirps page
  var newChirpFromForm = req.body;

  models.Chirp.create(newChirpFromForm).then(() => {
    res.redirect("/chirps");
  });
});

//Get specific chirp
app.get("/chirps/:id/edit", (req, res) => {
  // Step 1: Retrieve specific chirp via its ID in the url
  // Step 2: Create HTML based on the specific chirp data
  // Step 3: Send back completed HTML to the browser
  models.Chirp.findById(req.params.id).then((chirp) => {
    res.render("edit", { chirp });
  });
});

//Edit a chirp
app.put("/chirps/:id", (req, res) => {
  // Step 1: Get specific chirp from database via its ID
  // Step 2: Retrieve updated chirp text from the form submission
  // Step 3: Alter properties of the existing chirp as per the new data
  // Step 4: Redirect back to show all chirps page
  models.Chirp.findById(req.params.id).then((chirp) => {
    chirp.updateAttributes(req.body).then(() => {
      res.redirect("/chirps");
    });
  });
});

//Delete a chirp
app.delete("/chirps/:id", (req, res) => {
  // Step 1: Retrieve specific chirp via its ID
  // Step 2: Destroy that chirp
  // Step 3: Redirect back to show all chirps page
  models.Chirp.findById(req.params.id).then((chirp) => {
    chirp.destroy().then(() => {
      res.redirect("/chirps");
    });
  });
});

app.listen(process.env.PORT || 3000);
