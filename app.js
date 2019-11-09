var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const mqtt = require('mqtt');
var mqttHandler = require('./mqtt_handler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

var mqttClient = new mqttHandler();
mqttClient.connect();


// Routes
app.post("/luz/encender", function(req, res) {
 
  mqttClient.sendMessage('0',req.body.mens);
  res.status(200).send('0');
  res.json({"success": true});
});
app.post("/luz/apagar", function(req, res) {
  mqttClient.sendMessage('1',req.body.mens);
  res.status(200).send('1');
   res.json({"success": true});
});

app.post("/acceso/abrir", function(req, res) {
  mqttClient.sendMessage('2', req.body.message)
  res.status(200).send('2');
   res.json({"success": true});
});

app.post("/acceso/cerrar", function(req, res) {
  mqttClient.sendMessage('3', req.body.message)
  res.status(200).send('3');
   res.json({"success": true});
});

 var port = process.env.PORT || 8080;

var server = app.listen(8080,function () {
    console.log("app running on port.", server.address().port);
});