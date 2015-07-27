var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/SquareTrade');

var app = express();
app.use(bodyParser);
app.use(cors);


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
});

app.get("/", function (req, res) {
  Url.find(function (err, urls) {
    res.send(urls);
  });
});

app.listen(3000);