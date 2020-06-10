'use strict'
const sql = require('../config/db');

const Model = function(model) {
  this.createdDate = new Date();
};

Model.getAll = function(result, table) {
  sql.query(`SELECT * FROM ${table};`, function(err, res) {
    if (err) {
      console.log('getAll error: ', err);
      result(null, err);
    } else {
      //console.log('getAll res: ', res);
      result(null, res);
    }
  });
};

Model.createOne = function(newModel, result, table) {
  sql.query(`INSERT INTO ${table} SET ?;`, newModel, function(err, res) {
    if (err) {
      console.log('createOne error: ', err);
      result(null, err);
    } else {
      console.log('createOne res: ', res);
      result(null, res);
    }
  });
};

// Bulk create

// Read
Model.getOne = function(id, result, table) {
  console.log('id: ', id);
  console.log('result: ', result);
  console.log('table: ', table);
  sql.query(`SELECT * FROM ${table} WHERE id = ?`, id, function(err, res) {
    if (err) {
      console.log('getOne error: ', err);
      result(null, err);
    } else {
      console.log('getOne res: ', res);
      result(null, res);
    }
  });
}

// Update

// Delete

module.exports = Model;
