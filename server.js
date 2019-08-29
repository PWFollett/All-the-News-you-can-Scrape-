
var express = require("express");

var mongoose = require("mongoose");


var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

const PORT = process.env.PORT || 8080;


var app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://<dbuser>:<dbpassword>@ds151997.mlab.com:51997/heroku_drskj777";

mongoose.connect(MONGODB_URI);


app.get("/scrape", function (req, res) {
  console.log("We hit the Scrape Route")

  axios.get("https://stackoverflow.com/search?q=mongoose").then(function(response) {

  
    var $ = cheerio.load(response.data);
    // console.log(response.data)

    
    var result = {};
  
  console.log("cheerio test", $(".question-summary").html())
    
    $(".question-summary").each(function (i, element) {

      result.title = $(this).text();
      result.link = $(this).attr("href");

      console.log(result)
     
      db.Question.create(result)
        .then(function (dbQuestion) {
         
          console.log(dbQuestion);
        })
        .catch(function (err) {

          return res.json(err);
        });


   
      res.send("You were able to sucessfully scrape!!!");
    });
  });
});


app.get("/questions", function (req, res) {

  db.Question.find({})
    .then(function (dbQuestion) {
    
      res.json(dbQuestion);
    })
    .catch(function (err) {
      
      res.json(err);
    });
});


app.get("/questions/:id", function (req, res) {
 
  db.Question.findOne({
      _id: req.params.id
    })
    
    .populate("note")
    .then(function (dbQuestion) {
     
      res.json(dbQuestion);
    })
    .catch(function (err) {
      
      res.json(err);
    });
});


app.post("/questions/:id", function (req, res) {
 
  db.Note.create(req.body)
    .then(function (dbNote) {
     
      return db.Question.findOneAndUpdate({
        _id: req.params.id
      }, {
        note: dbNote._id
      }, {
        new: true
      });
    })
    .then(function (dbQuestion) {
  
      res.json(dbQuestion);
    })
    .catch(function (err) {
      
      res.json(err);
    });
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
