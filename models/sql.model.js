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
Model.updateOne = async function(id, model, result, table) {
  console.log('updateOne model: ', model);
  let arr = [];
  arr.push(model);
  console.log('arr: ', arr);
  await bulkUpdate(table, arr, id, function(err, res) {
    if (err) {
      console.log('updateOne error: ', err);
      result(null, err);
    } else {
      console.log('updateOne res: ', res);
      result(null, res);
    }
  });
}

// function to update a json object without having to worry about the columns and values
// I have no idea why this isn't an out of the box function but there you have it...
async function bulkUpdate(table, objectArray, id, callback) {

  let keys = Object.keys(objectArray[0]);
  //let values = objectArray.map(obj => keys.map(key => obj[key]));
  let values = [];
  objectArray.map(obj => keys.map(key => {
    if (key !== 'id') {
      if (obj[key] === 'NULL') obj[key] = null;
      obj[key] = ` ${key} = '${obj[key]}'`;
    }
    console.log('obj[key]: ', obj[key]);
    values.push(obj[key]);
  }));

  console.log('values: ', values);

  // replace 'NULL' with NULL
  /*values.map(outside => {
    outside.forEach(function(e, i) {
      if (e === 'NULL') {
        outside[i] = null;
      }
    });
  });*/

  console.log('values: ', values);

  // UPDATE {table} SET colname = ?, ...    WHERE id = ?;
  let sqlstatement = `UPDATE ${table} SET${values} WHERE id = ${id};`;
  console.log('sqlstatement: ', sqlstatement);
  await sql.query(sqlstatement, function(error, results, fields) {
    if (error) return callback(error);
    callback(null, results);
  });
}

// Delete

module.exports = Model;
