// * express
//======================================
var express = require('express');
var app = express();

// * sequelize
//======================================
var Sequelize = require("sequelize");
var sequelize = require("./config/connection.js");


var path = require('path');

//======================================
// * method-override
var methodOverride  = require("method-override");
//======================================
// * body-parser
var bodyParser      = require("body-parser");
//======================================

app.use(express.static(__dirname + '/public'));
//=====================================================
//define PORT, start server
//
var PORT = Number(process.env.PORT  || 5000);
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});