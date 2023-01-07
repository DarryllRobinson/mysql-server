'use strict'
const sql = require('../config/db');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const Emailer = require('../models/emailer');

const Session = function(model) {
  this.createdDate = new Date();
};

function ok(body) {
  return ({
    ok: true,
    text: body
  });
  //resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
}

function unauthorised() {
  return ({
    status: 401,
    text: 'Unauthorised'
  });
  //resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
}

function error(message) {
  return ({
    status: 400,
    text: message
  });
}

Session.getServicesByClientId = function(clientId, result) {
  sql.query(`SELECT * FROM clientservices WHERE f_clientId = ?;`, clientId, function(err, res) {
    if (err) {
      console.log('getServicesByClientId error: ', err);
      result(null, err);
    } else {
      //console.log('getServicesByClientId res: ', res);
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
      //console.log('getAllClients res: ', res);
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
            //console.log('createUser res: ', res);
            if (res.length > 0) {
              let href = "";
              switch (process.env.REACT_APP_STAGE) {
                case 'development':
                  href = "http://localhost:3000/";
                  break;
                case 'production':
                  href = "https://thesystem.co.za/";
                  break;
                case 'sit':
                  href = "https://sit.thesystem.co.za/";
                  break;
                case 'uat':
                  href = "https://uat.thesystem.co.za/";
                  break;
                default:
                  port = 0;
                  break;
              }

              Emailer.sendEmail(
                'creation',
                email,
                'Welcome to The System',
                'Welcome to The System',
                `
                  <p>${newUser.firstName}, you have been registered as a new user on The System.</p>
                  <p>Please click <a href=${href} target="_blank">here</a> to be taken to the login page. Your password will be sent to you by your supervisor.</p>
                  <br /><br />
                  <p>The System Team</p>
                `
              );
            }
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
  sql.query(`SELECT firstName, surname, email, password, role, type, storeId, f_clientId, active FROM users WHERE email = ?;`, email, function(err, res) {
    if (err) {
      //console.log('getUser error: ', err);
      const errorMsg = error(`getUser SELECT error`);
      result(null, errorMsg);
    } else if (res.length === 0) {
      const errorMsg = error('Username or password is incorrect');
      result(null, errorMsg);
    } else {
      //console.log('getUser res: ', res);

      // check password matches
      bcrypt.compare(password, res[0].password, function(err, match) {
        //console.log('password: ', password);
        //console.log('res[0].password: ', res[0].password);
        //console.log('match: ', match);
        if (match) {
          if (res[0].active !== 1) {
            const errorMsg = error('User is inactive');
            result(null, errorMsg);
          } else {
            const user = ok({
              token: jwt.sign({ sub: res.id }, config.secret, { expiresIn: '1d' }),
              email: res[0].email,
              firstName: res[0].firstName,
              surname: res[0].surname,
              role: res[0].role,
              storeId: res[0].storeId,
              type: res[0].type,
              clientId: res[0].f_clientId
            });
            result(null, user);
          }
        } else {
          const errorMsg = error('Username or password is incorrect');
          result(null, errorMsg);
        }
      });

    }
  })
}

Session.oldgetUser = function(email, password, result) {
  //console.log('getUser email: ', email);
  //console.log('getUser password: ', password);
  sql.query(`SELECT firstName, surname, email, role, type, storeId, password, f_clientId, active FROM users WHERE email = ?;`, email, function(err, res) {
    //console.log('------------------------------- res: ', res);
    //console.log('------------------------------- res[0].active: ', res[0].active);
    if (err) {
      console.log('getUser SELECT error: ', err);
      result(null, err);
    } else if (res.length === 0) {
      res.push({ user: {} });
      res.push({ logged_in: false });
      res.push({ status: 401 });
      console.log('Email user not found in sessions.model.js: ', res);
      result(null, res);
    } else if (res[0].active !== 1) {
      res = [];
      res.push({ user: {} });
      res.push({ logged_in: false });
      res.push({ status: 401 });
      console.log('User is not active in sessions.model.js: ', res);
      result(null, res);
    } else {
      // comparing passwords
      bcrypt.compare(password, res[0].password, function(err, match) {
        if (match) {
          console.log('Passwords match');
          const token = jwt.sign({ sub: res.id }, config.secret, { expiresIn: '7d' });
          res.match = match;
          res.push({ logged_in: true });
          res.push({ ok: true });
          res.push({ token: token });
          //console.log('Matched res in sessions.model.js: ', res);
          result(null, res);
        } else {
          console.log('Passwords do not match in sessions.model.js: ', res);
          res = [];
          res.push({ user: {} });
          res.push({ logged_in: false });
          res.push({ status: 401 });
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
