'use strict'
const sql = require('../config/db');
const bcrypt = require ('bcryptjs');
const Emailer = require('../models/emailer');

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

Session.getAllClients = function(result) {
  sql.query(`SELECT * FROM clients;`, function(err, res) {
    if (err) {
      console.log('getAllClients error: ', err);
      result(null, err);
    } else {
      console.log('getAllClients res: ', res);
      result(null, res);
    }
  });
}

Session.getConfig = function(table, result) {
  sql.query(`SELECT * FROM ${table};`, function(err, res) {
    if (err) {
      console.log('getConfig error: ', err);
      result(null, err);
    } else {
      //console.log('getConfig res: ', res);
      result(null, res);
    }
  });
}

Session.createUser = function(newUser, result) {
  //console.log('starting createUser: ', newUser);
  const email = newUser.email;
  sql.query(`SELECT email FROM users WHERE email = ?;`, email, function(err, res) {
    if (err) {
      console.log('getAllUsers error: ', err);
      result(null, err);
    } else {
      //console.log('res.length: ', res.length);
      if (res.length > 0) {
        result(null, 'user exists');
      } else {
        //console.log('user is unique');
        sql.query(`INSERT INTO users SET ?;`, newUser, function(err, res) {
          if (err) {
            console.log('createUser error: ', err);
            result(null, err);
          } else {
            console.log('createUser res: ', res);
            Emailer.sendEmail(email);
            result(null, res);
          }
        });
      }
    }
  });
}

/*Session.createUser = function(newUser, result) {
  const email = req.body.email;
  sql.query(`SELECT email FROM users WHERE email = ?;`, email, function(err, res) {
    if (err) {
      console.log('getAllUsers error: ', err);
      result(null, err);
    } else {
      if (res.length > 0) {
        result(null, 'user exists');
      } else {
        sql.query(`INSERT INTO users SET ?;`, newUser, function(err, res) {
          if (err) {
            console.log('createUser error: ', err);
            result(null, err);
          } else {
            console.log('createUser res: ', res);
            result(null, res);
          }
        });
      }
    });}
  });
}

Session.createUser = function(newUser, result) {
  console.log('creating user');
  sql.query(`INSERT INTO users SET ?;`, newUser, function(err, res) {
    if (err) {
      console.log('createUser error: ', err);
      result(null, err);
    } else {
      console.log('createUser res: ', res);
      result(null, res);
    }
  });
}*/

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
