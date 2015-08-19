// mongo ds031613.mongolab.com:31613/inventory -u netcse -p number1sakibkhan

var mongo = require('mongodb');
var express = require('express');
var monk = require('monk');

// var db = monk('localhost:27017');

var db =  monk('mongodb://netcse:number1sakibkhan@ds31613.mongolab.com:31613/inventory');
var app = new express();

app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
  db.driver.admin.listDatabases(function(e,dbs){
      res.json(dbs);
  });
});
app.get('/collections',function(req,res){
  db.driver.collectionNames(function(e,names){
    res.json(names);
  })
});
app.get('/collections/:name',function(req,res){
  var collection = db.get(req.params.name);
  collection.find({},{limit:200},function(e,docs){
    res.json(docs);
  })
});


app.listen(3000)