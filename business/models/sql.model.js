'use strict'
const sql = require('../config/db');

const Model = function(model) {
  this.createdDate = new Date();
};

Model.getAllCollections = function(clientId, result) {
  console.log('Running getAllCollections');
  sql.query(`SELECT * FROM customers, accounts, cases
    WHERE  customers.customerRefNo = accounts.f_customerId
    AND accounts.accountNumber = cases.f_accountNumber
    AND customers.f_clientId = ?;`, clientId, function(err, res) {
    if (err) {
      console.log('getAllCollectionsByClientId error: ', err);
      result(null, err);
    } else {
      //console.log('collections res: ', res);
      result(null, res);
    }
  });
}

Model.getAllCollectionsForToday = function(clientId, result) {
  console.log('Running getAllCollectionsForToday');
  sql.query(`SELECT * FROM accounts, customers, cases, outcomes
     WHERE accounts.f_customerId = customers.id
     AND cases.f_accountNumber = accounts.accountNumber
     AND cases.id = outcomes.f_caseNumber
     AND outcomes.nextVisitDate < NOW()
     AND outcomes.nextVisitDate IS NOT NULL
     AND customers.f_clientId = ?;`, clientId, function(err, res) {
    if (err) {
      console.log('getAllCollectionsForToday error: ', err);
      result(null, err);
    } else {
      console.log('getAllCollectionsForToday res: ', res);
      result(null, res);
    }
  });
}

Model.createOne = function(table, newItem, result) {
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
Model.createMany = async function(table, newItems, result) {
  try {
    await bulkInsert(table, newItems, (error, response) => {
      if (error) {
        console.log('bulkInsert error: ', error);
        error.json({
          error_code: 1,
          err_desc: error,
          data: null
        });
      }
      console.log(`Successful insert of ${response.affectedRows} rows`);
      result(null, response.affectedRows);
    });
  } catch (e) {
    console.log('createMany problem (e): ', e);
    return res.json({
      error_code: 1,
      err_desc: err,
      data: null
    });
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
Model.getOne = function(table, clientId, recordId, result) {
  console.log('getOne params: ', table, clientId, recordId);
  sql.query(`SELECT * FROM ${table} WHERE clientId = ${clientId} AND id = ?`, recordId, function(err, res) {
    if (err) {
      console.log('getOne error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

Model.getOneCase = function(table, clientId, recordId, result) {
  console.log('getOneCase params: ', table, clientId, recordId);
  sql.query(`SELECT * FROM customers, accounts, contacts, cases, outcomes
     WHERE customers.customerRefNo = accounts.f_customerId
     AND accounts.accountNumber = cases.f_accountNumber
     AND contacts.f_accountNumber = accounts.accountNumber
     AND cases.caseNumber = outcomes.f_caseNumber
     AND customers.f_clientId = ${clientId}
     AND cases.caseNumber = ?;`, recordId, function(err, res) {
    if (err) {
      console.log('cases getOne error: ', err);
      result(null, err);
    } else {
      console.log('collections res: ', res);
      result(null, res);
    }
  });
}

// Update
Model.updateOne = async function(table, clientId, id, model, result) {
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
  let sqlstatement = `UPDATE ${table} SET${values} WHERE id = ${id};`;
  await sql.query(sqlstatement, function(error, results, fields) {
    if (error) return callback(error);
    callback(null, results);
  });
}

/*

Model.getAllCollectionsByClientId = function(type, workspace, task, clientId, result) {
  console.log('getAllCollectionsByClientId type: ', type);
  console.log('getAllCollectionsByClientId workspace: ', workspace);
  console.log('getAllCollectionsByClientId task: ', task);
  console.log('getAllCollectionsByClientId clientId: ', clientId);

  sql.query(`SELECT * FROM accounts, customers, cases, outcomes
     WHERE accounts.f_customerId = customers.id
     AND cases.f_accountNumber = accounts.accountNumber
     AND cases.id = outcomes.f_caseNumber
     AND f_clientId = ?;`, clientId, function(err, res) {
    if (err) {
      console.log('getAllCollectionsByClientId error: ', err);
      result(null, err);
    } else {
      console.log('collections res: ', res);
      result(null, res);
    }
  });
};

Model.getAllApplicationsByClientId = function(type, workspace, task, clientId, result) {
  console.log('getAllApplicationsByClientId type: ', type);
  console.log('getAllApplicationsByClientId workspace: ', workspace);
  console.log('getAllApplicationsByClientId task: ', task);
  console.log('getAllApplicationsByClientId clientId: ', clientId);

  sql.query(`SELECT * FROM applications WHERE f_clientId = ?;`, clientId, function(err, res) {
    if (err) {
      console.log('getAllApplicationsByClientId error: ', err);
      result(null, err);
    } else {
      console.log('applications res: ', res);
      result(null, res);
    }
  });
}



Model.createOne = function(table, newItem, result) {
  sql.query(`INSERT INTO ${table} SET ?;`, newItem, function(err, res) {
    if (err) {
      console.log('createOne error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};


/*
Model.getAll = function(result, table) {
  sql.query(`SELECT * FROM ${table};`, function(err, res) {
    if (err) {
      console.log('getAll error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Model.getAllById = function(workspace, clientId, result, table) {
  console.log('workspace: ', workspace);
  console.log('clientId: ', clientId);

  switch (workspace) {
    case 'collections':
      console.log('running collections');
      sql.query(`SELECT * FROM accounts, customers, cases, outcomes
         WHERE accounts.f_customerId = customers.id
         AND cases.f_accountNumber = accounts.accountNumber
         AND cases.id = outcomes.f_caseNumber
         AND f_clientId = ?;`, clientId, function(err, res) {
        if (err) {
          console.log('getAllById error: ', err);
          result(null, err);
        } else {
          console.log('collections res: ', res);
          result(null, res);
        }
      });
      break;
    case 'applications':
      console.log('running applications');
      sql.query(`SELECT * FROM ${table} WHERE f_clientId = ?;`, clientId, function(err, res) {
        if (err) {
          console.log('getAllById error: ', err);
          result(null, err);
        } else {
          console.log('applications res: ', res);
          result(null, res);
        }
      });
      break;
    default:
      console.log('Cannot handle an unknown workspace: ', workspace);
      break;
  }
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
Model.getOne = function(type, id, result, table) {
  sql.query(`SELECT * FROM ${type}_${table} WHERE id = ?`, id, function(err, res) {
    if (err) {
      console.log('getOne error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

// Read one based on foreign key
Model.f_getOne = function(type, id, result, table) {
  sql.query(`SELECT * FROM ${type}_${table} WHERE f_id = ?`, id, function(err, res) {
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
  let sqlstatement = `UPDATE ${table} SET${values} WHERE id = ${id};`;
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
*/
module.exports = Model;
