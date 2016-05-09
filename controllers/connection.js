// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

var mysql = require('mysql');

var source = {

    jawsDB: {
        port: 3306,
        host: 'l9dwvv6j64hlhpul.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'c3s2cpxr2c42o8q5',
        password: "jtd6qn8wzh9n8igx",
        database: "nxow7a90d6uh3egj"
    }
}
var connection = mysql.createConnection(source.jawsDB);


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;