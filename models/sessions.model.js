'use strict'
const sql = require('../config/db');
const bcrypt = require ('bcryptjs');

const Session = function(model) {
  this.createdDate = new Date();
};

// Read
Session.createSession = function(newSession, result) {
  console.log('newSession: ', newSession);
  console.log('typeof newSession: ', typeof newSession);
  sql.query(`INSERT INTO sessions SET ?;`, newSession, function(err, res) {
  //sql.query(`SELECT * FROM users WHERE email = ?`, id, function(err, res) {
    if (err) {    // ******* include error handling for when rows can't be inserted, etc.
      console.log('createSession INSERT INTO error: ', err);
      result(null, err);
    } else {
      console.log('createSession INSERT INTO result: ', res);
      res.email = newSession.email;
      result(null, res);
    }
  });
}

Session.getUser = function(email, password, result) {
  console.log('getUser email: ', email);
  console.log('getUser password: ', password);
  sql.query(`SELECT firstName, surname, email, role, storeId, password, f_clientId FROM users WHERE email = ?;`, email, function(err, res) {
    if (err) {
      console.log('getUser SELECT error: ', err);
      result(null, err);
    } else if (res.length === 0) {
      res.push({user: {}});
      res.push({logged_in: false});
      console.log('getUser res: ', res);
      result(null, res);
    } else {
      // comparing passwords
      bcrypt.compare(password, res[0].password, function(err, match) {
        if (match) {
          res.match = match;
          result(null, res);
        } else {
          res.push({user: {}});
          res.push({logged_in: false});
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
