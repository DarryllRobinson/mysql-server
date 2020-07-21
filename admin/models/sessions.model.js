'use strict'
const sql = require('../config/db');
const bcrypt = require ('bcryptjs');

const Session = function(model) {
  this.createdDate = new Date();
};

Session.getServicesByClientId = function(clientId, result) {
  sql.query(`SELECT * FROM clientservices WHERE f_clientId = ?;`, clientId, function(err, res) {
    if (err) {
      console.log('getServicesByClientId error: ', err);
      result(null, err);
    } else {
      console.log('getServicesByClientId res: ', res);
      result(null, res);
    }
  });
}

Session.getUser = function(email, password, result) {
  console.log('getUser email: ', email);
  console.log('getUser password: ', password);
  sql.query(`SELECT firstName, surname, email, role, type, storeId, password, f_clientId FROM users WHERE email = ?;`, email, function(err, res) {
    if (err) {
      console.log('getUser SELECT error: ', err);
      result(null, err);
    } else if (res.length === 0) {
      res.push({user: {}});
      res.push({logged_in: false});
      console.log('Email user not found in sessions.model.js: ', res);
      result(null, res);
    } else {
      // comparing passwords
      bcrypt.compare(password, res[0].password, function(err, match) {
        if (match) {
          console.log('Passwords match');
          res.match = match;
          res.push({logged_in: true});
          console.log('Matched res in sessions.model.js: ', res);
          result(null, res);
        } else {
          console.log('Passwords do not match in sessions.model.js: ', res);
          res = [];
          res.push({user: {}});
          res.push({logged_in: false});
          console.log('Failed authentication in sessions.model.js: ', res);
          result(null, res);
        }
      });
    }
  });
}

Session.checkAuth = function(email, result) {
  console.log('checkAuth email: ', email);
  sql.query(`SELECT * FROM sessions WHERE email = ?;`, email, function(err, res) {
    if (err) {
      console.log('checkAuth error: ', err);
      result(null, err);
    } else if (res.length === 0) {
      res.push({user: {}});
      res.push({logged_in: false});
      result(null, res);
    } else {
      console.log('checkAuth res: ', res);
      res.push({logged_in: true});
      result(null, res);
    }
  });
}

// Delete
Session.removeOne = function(email, result) {
  sql.query(`DELETE FROM sessions WHERE email = ?;`, email, function(err, res) {
    if (err) {
      console.log('removeOne error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

module.exports = Session;
