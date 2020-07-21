'use strict'
const mysql = require('mysql');

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.NODE_ENV === 'development' ? 'root' : 'prod-user',
  port: '3306',
  password: process.env.NODE_ENV === 'development' ? 'password' : 'prod-pass',
  database: 'cws_consumer'
});

connection.connect(function(err) {
  if (err) {
    return console.error('Connection error: ' + err.message);
  }
  console.log('Connected to the cws_consumer MySQL server');
});

function keepalive() {
  connection.query('select 1', [], function(err, result) {
    if(err) return console.log(err);
    // Successul keepalive
    console.log("keepalive: "+ result);
  });
}

setInterval(keepalive, 1000*60*60);

module.exports = connection;
