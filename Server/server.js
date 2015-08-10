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

var MinifiedKeywordSchema = {"MinifiedKeyword" : String}
var MinifiedKeyword = mongoose.model('MinifiedKeyword', MinifiedKeywordSchema);


app.post('/addUrl', function (req, res) {
  var urlObject = new Url(req.body);
  if (isKeywordAvailable(req.body.MinifiedUrl)) {
    urlObject.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        getAllMinifiedUrls(res);
      }
    });
  } else {
    res.send("ERR:1001")
  }
});

app.get("/", function (req, res) {
  Url.find(function (err, urls) {
    res.send(urls);
  });
});

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
  Url.findByIdAndRemove(req.params.id, function(err, successResponse) {
    if(err) {
      res.send("Unable to delete the Document. Try again later!!!");
    } else{
      getAllMinifiedUrls(res);
    }
  })
});

function getAllMinifiedUrls(res) {
  Url.find(function (err, urls) {
    res.send(urls);
  });
}

function isKeywordAvailable(minifiedKeyword) {
  MinifiedKeyword.find({"MinifiedKeyword" : minifiedKeyword}, function(err, response) {
    if(err){
      return "Server response failed. Try Again!"
    } else{
      if(response.length > 0){
        return false;
      } else {
        console.log("can be inserted");
        insertNewMinifiedKeyword(minifiedKeyword);
        return true;
      }
    }
  })
}

function insertNewMinifiedKeyword(newMinifiedKeyword) {
  var newMinifiedKeyword = new MinifiedKeyword({"MinifiedKeyword" : newMinifiedKeyword});
  newMinifiedKeyword.save(function (err) {
    if (err) {
      res.send(err);
    } else {
        console.log("saved");
    }
  });
}

