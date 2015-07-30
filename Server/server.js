var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/SquareTrade');

app.use(bodyParser());
app.use(cors());

app.listen(3000);

var UrlSchema = {"OriginalUrl": String, "MinifiedUrl": String, "CreatedBy": String, "CreatedOn": Date};
var Url = mongoose.model('Url', UrlSchema);

var testUrl = new Url({
  OriginalUrl: 'www.google.com',
  MinifiedUrl: 'gogl',
  CreatedBy: "Madhur Mehta",
  CreatedOn: new Date()
});


app.post('/addUrl', function (req, res) {
  console.log(req.body);
  var urlObject = new Url(req.body);
  urlObject.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      getAllMinifiedUrls(req, res);
    }
  });
});

app.get("/", function (req, res) {
  Url.find(function (err, urls) {
    console.log(urls);
    res.send(urls);
  });
});

function getAllMinifiedUrls(req, res) {
  Url.find(function (err, urls) {
    console.log(urls);
    res.send(urls);
  });
}

app.get("/SqrTd/:key", function (req, res) {
  Url.findOne({MinifiedUrl : req.params.key}, function (err, url) {
    if (err != null) {
      res.send("Url not found");
    } else {
      res.redirect("https://" + url.OriginalUrl);
    }
  });
});

app.delete("/removeUrl/:id", function(req, res){
  console.log(req.params.id);
  Url.findByIdAndRemove(req.params.id, function(err, successResponse) {
    if(err) {
      res.send("Unable to delete the Document. Try again later!!1");
    } else{
      console.log(successResponse);
      getAllMinifiedUrls(req, res);
    }
  })
});