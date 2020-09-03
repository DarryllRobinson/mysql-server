'use strict'
const sql = require('../config/db');
const bcrypt = require ('bcryptjs');

const User = function(user) {
  this.createdDate = new Date();
};

// List all
User.getAllUsers = function(clientId, result) {
  sql.query(`SELECT * FROM users WHERE f_clientId = ?;`, clientId, function(err, res) {
    if (err) {
      console.log('getAllUsers error: ', err);
      result(null, err);
    } else {
      console.log('getAllUsers res: ', res);
      result(null, res);
    }
  });
}

// Delete
User.deleteUser = function(userId, result) {
  console.log('deleteUser userId: ', userId);
  sql.query(`DELETE FROM users WHERE id = ?;`, [userId], function(err, res) {
    if (err) {
      console.log('deleteUser error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

module.exports = User;
