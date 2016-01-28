#!/usr/bin/env node

var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = 8080,
    publicDir =  __dirname,
    path = require('path');



app.use('/vendor/bootstrap/main.css',function(req,res){
  res.sendFile(publicDir + '/node_modules/bootstrap/dist/css/bootstrap.min.css')
})

app.use('/vendor/font-awesome/main.css',function (req,res){
  res.sendFile(publicDir + '/node_modules/font-awesome/css/font-awesome.min.css')
})

app.use('/vendor/fonts/', function (req,res){
  res.sendFile(publicDir + '/node_modules/font-awesome/fonts/'+req.path)
})

app.get("/", function (req, res) {
  res.sendFile(path.join(publicDir, "/pages/index.html"));
});

app.get("/index.html", function (req, res) {
  res.sendFile(path.join(publicDir, "/pages/index.html"));
});


app.get("/examples.html", function (req, res) {
  res.sendFile(path.join(publicDir, "/pages/examples.html"));
});



app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.use(express.static(publicDir));




app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

console.log("Simple static server showing %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);