'use strict'
const sql = require('../config/db');

const Model = function(model) {
  this.createdDate = new Date();
};

Model.getAll = function(result, table) {
  sql.query(`SELECT * FROM accounts, customers, cases, outcomes
     WHERE accounts.f_customerId = customers.id
     AND cases.f_accountNumber = accounts.accountNumber
     AND cases.id = outcomes.f_caseNumber;`, function(err, res) {
    if (err) {
      console.log('getAll error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Model.createOne = function(newItem, result, table) {
  sql.query(`INSERT INTO ${table} SET ?;`, newItem, function(err, res) {
    if (err) {
      console.log('createOne error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// Bulk create
Model.createMany = async function(newItems, result, table) {
  try {
    await bulkInsert(table, newItems, (error, response) => {
      if (error) {
        console.log('bulkInsert error: ', error);
        error.json({error_code: 1, err_desc: error, data: null});
      }
      console.log(`Successful insert of ${response.affectedRows} rows`);
      result(null, response.affectedRows);
    });
  } catch (e) {
    console.log('createMany problem (e): ', e);
    return res.json({error_code: 1,err_desc: err, data: null});
  }
}

async function bulkInsert(table, objectArray, callback) {
  let keys = Object.keys(objectArray[0]);
  let values = objectArray.map( obj => keys.map( key => obj[key]));

  // replace 'NULL' with NULL
  values.map(outside => {
    outside.forEach(function(e, i) {
      if (e === 'NULL') {
        outside[i] = null;
      }
    });
  });

  let sqlstatement = 'INSERT INTO ' + table + ' (' + keys.join(', ') + ') VALUES ? ';
  //console.log('[values]: ', values);
  await sql.query(sqlstatement, [values], function (error, results, fields) {
    if (error) return callback(error);
    callback(null, results);
  });
}

// Read
Model.getOne = function(id, result, table) {
  console.log('id: ', id);
  sql.query(`SELECT * FROM accounts, customers, cases, outcomes
     WHERE accounts.f_customerId = customers.id
     AND cases.f_accountNumber = accounts.accountNumber
     AND cases.id = outcomes.f_caseNumber
     AND accounts.accountNumber = ?`, id, function(err, res) {
    if (err) {
      console.log('getOne error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

// Read one based on foreign key
Model.f_getOne = function(id, result, table) {
  sql.query(`SELECT * FROM ${table} WHERE f_id = ?`, id, function(err, res) {
    if (err) {
      console.log('f_getOne error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

// Update
Model.updateOne = async function(id, model, result, table) {
  let arr = [];
  arr.push(model);

  await bulkUpdate(arr, id, function(err, res) {
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
async function bulkUpdate(objectArray, id, callback) {

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
  let sqlstatement = `UPDATE accounts SET ${values} WHERE accountNumber = ${id};`;
  await sql.query(sqlstatement, function(error, results, fields) {
    if (error) return callback(error);
    callback(null, results);
  });
}

// Delete
Model.removeOne = function(id, result, table) {
  sql.query(`DELETE FROM ${table} WHERE id = ?;`, [id], function(err, res) {
    if (err) {
      console.log('removeOne error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

module.exports = Model;
