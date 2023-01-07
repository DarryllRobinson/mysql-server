'use strict'
const sql = require('../config/db');

const Comment = function(model) {
  this.createdDate = new Date();
};

// Read
Comment.getOne = function(id, result, table) {
  sql.query(`SELECT * FROM ${table} WHERE f_blogId = ?`, id, function(err, res) {
    if (err) {
      console.log('getOne error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

// Update
Comment.updateOne = async function(id, model, result, table) {
  let arr = [];
  arr.push(model);

  await bulkUpdate(table, arr, id, function(err, res) {
    if (err) {
      console.log('updateOne error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

// Function to update a json object without having to worry about the columns and values
// I have no idea why this isn't an out of the box function but there you have it...
// It's probably widely insecure but I'll look into that later
async function bulkUpdate(table, objectArray, id, callback) {

  let keys = Object.keys(objectArray[0]);
  let values = [];
  objectArray.map(obj => keys.map(key => {
    if (key !== 'id') {
      if (obj[key] === 'NULL') obj[key] = null;
      obj[key] = ` ${key} = '${obj[key]}'`;
    }
    values.push(obj[key]);
  }));

  // UPDATE {table} SET colname = ?, ...    WHERE id = ?;
  let sqlstatement = `UPDATE ${table} SET${values} WHERE f_blogId = ${id};`;
  await sql.query(sqlstatement, function(error, results, fields) {
    if (error) return callback(error);
    callback(null, results);
  });
}

module.exports = Comment;
