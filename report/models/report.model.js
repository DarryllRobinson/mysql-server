'use strict';
const sql = require('../config/db');

const Model = function (model) {
  this.createdDate = new Date();
};

// Aging report
Model.getAgingReport = function (clientId, result) {
  console.log('Running getAgingReport');
  sql.query(
    `SELECT SUM(currentBalance) AS 'Current',
    SUM(days30) AS '30',
    SUM(days60) AS '60',
    SUM(days90) AS '90',
    SUM(days120) AS '120',
    SUM(days150) AS '150',
    SUM(days180) AS '180',
    SUM(days180Over) AS '>180'
    FROM cws_business.accounts;`,
    function (err, res) {
      if (err) {
        console.log('getAgingReport error: ', err);
        result(null, err);
      } else {
        //res[0].title = 'aging';
        //console.log('getAgingReport res: ', res);
        result(null, res);
      }
    }
  );
};

// PTP by agent report
Model.getAgentPTPReport = function (clientId, result) {
  console.log('Running getAgentPTPReport');
  sql.query(
    `SELECT createdBy as Agent, SUM(ptpAmount) as Sum
    FROM cws_business.outcomes
    GROUP BY createdBy;`,
    function (err, res) {
      if (err) {
        console.log('getAgentPTPReport error: ', err);
        result(null, err);
      } else {
        //res[0].title = 'aging';
        //console.log('getAgentPTPReport res: ', res);
        result(null, res);
      }
    }
  );
};

// PTP by date report
Model.getDatePTPReport = function (clientId, result) {
  console.log('Running getDatePTPReport');
  sql.query(
    `SELECT substring(ptpDate, 1, 10)  as PTPDate, SUM(ptpAmount) as Sum
    FROM cws_business.outcomes
    WHERE ptpDate IS NOT NULL
    GROUP BY ptpDate;`,
    function (err, res) {
      if (err) {
        console.log('getDatePTPReport error: ', err);
        result(null, err);
      } else {
        //res[0].title = 'aging';
        //console.log('getDatePTPReport res: ', res);
        result(null, res);
      }
    }
  );
};

/*`SELECT SUM(currentBalance)/COUNT(currentBalance) AS 'Current',
SUM(days30)/COUNT(days30) AS '30',
SUM(days60)/COUNT(days60) AS '60',
SUM(days90)/COUNT(days90) AS '90',
SUM(days120)/COUNT(days120) AS '120',
SUM(days150)/COUNT(days150) AS '150',
SUM(days180)/COUNT(days180) AS '180',
SUM(days180Over)/COUNT(days180Over) AS '>180'
FROM cws_business.accounts;`*/

Model.getAllCollectionsForToday = function (clientId, user, result) {
  console.log('Running getAllCollectionsForToday');
  sql.query(
    `SELECT * FROM customers, accounts, cases
    WHERE customers.customerRefNo = accounts.f_customerId
    AND accounts.accountNumber = cases.f_accountNumber
    AND cases.nextVisitDateTime > (Now() - interval 1440 minute)
    AND cases.nextVisitDateTime IS NOT NULL
    AND cases.currentAssignment = "${user}"
    AND customers.f_clientId = ?;`,
    clientId,
    function (err, res) {
      if (err) {
        console.log('getAllCollectionsForToday error: ', err);
        result(null, err);
      } else {
        console.log('getAllCollectionsForToday res: ', res);
        if (res.length > 0) result(null, res);
      }
    }
  );
};

Model.getAllForReport = function (clientId, recordId, result) {
  console.log('getAllForReport params: ', clientId, recordId);
  sql.query(
    `SELECT * FROM customers, accounts, contacts, cases, outcomes
     WHERE customers.customerRefNo = accounts.f_customerId
     AND accounts.accountNumber = cases.f_accountNumber
     AND contacts.f_accountNumber = accounts.accountNumber
     AND cases.caseId = outcomes.f_caseId
     AND customers.f_clientId = ${clientId};`,
    recordId,
    function (err, res) {
      if (err) {
        console.log('getAllForReport error: ', err);
        result(null, err);
      } else {
        console.log('getAllForReport res: ', res);
        result(null, res);
      }
    }
  );
};

Model.createOne = function (table, newItem, result) {
  sql.query(`INSERT INTO ${table} SET ?;`, newItem, function (err, res) {
    if (err) {
      console.log('createOne error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// Bulk create
Model.createMany = async function (table, newItems, result) {
  try {
    await bulkInsert(table, newItems, (error, response) => {
      if (error) {
        console.log('bulkInsert error: ', error);
        error.json({
          error_code: 1,
          err_desc: error,
          data: null,
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
      data: null,
    });
  }
};

async function bulkInsert(table, objectArray, callback) {
  let keys = Object.keys(objectArray[0]);
  let values = objectArray.map((obj) => keys.map((key) => obj[key]));

  // replace 'NULL' with NULL
  values.map((outside) => {
    outside.forEach(function (e, i) {
      if (e === 'NULL') {
        outside[i] = null;
      }
    });
  });

  let sqlstatement =
    'INSERT INTO ' + table + ' (' + keys.join(', ') + ') VALUES ? ';
  //console.log('[values]: ', values);
  await sql.query(sqlstatement, [values], function (error, results, fields) {
    if (error) return callback(error);
    callback(null, results);
  });
}

// Read
Model.getOne = function (table, clientId, recordId, result) {
  console.log('getOne params: ', table, clientId, recordId);
  sql.query(
    `SELECT * FROM ${table} WHERE clientId = ${clientId} AND id = ?`,
    recordId,
    function (err, res) {
      if (err) {
        console.log('getOne error: ', err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Model.getOneCase = function (table, clientId, recordId, result) {
  console.log('getOneCase params: ', table, clientId, recordId);
  sql.query(
    `SELECT * FROM customers, accounts, contacts, cases
     WHERE customers.customerRefNo = accounts.f_customerId
     AND accounts.accountNumber = cases.f_accountNumber
     AND contacts.f_accountNumber = accounts.accountNumber
     AND customers.f_clientId = ${clientId}
     AND cases.caseId = ?;`,
    recordId,
    function (err, res) {
      if (err) {
        console.log('getOneCase error: ', err);
        result(null, err);
      } else {
        console.log('getOneCase res: ', res);
        result(null, res);
      }
    }
  );
};

Model.getOutcomesForCase = function (table, clientId, recordId, result) {
  console.log('getOutcomesForCase params: ', table, clientId, recordId);
  sql.query(
    `SELECT * FROM customers, accounts, contacts, cases, outcomes
     WHERE customers.customerRefNo = accounts.f_customerId
     AND accounts.accountNumber = cases.f_accountNumber
     AND contacts.f_accountNumber = accounts.accountNumber
     AND cases.caseId = outcomes.f_caseId
     AND customers.f_clientId = ${clientId}
     AND cases.caseId = ?
     ORDER BY outcomes.closedDate DESC;`,
    recordId,
    function (err, res) {
      if (err) {
        console.log('getOutcomesForCase error: ', err);
        result(null, err);
      } else {
        console.log('getOutcomesForCase res: ', res);
        result(null, res);
      }
    }
  );
};

Model.getContactsForCase = function (table, clientId, recordId, result) {
  console.log('getContactsForCase params: ', table, clientId, recordId);
  sql.query(
    `SELECT primaryContactName, primaryContactNumber, primaryContactEmail, representativeName, representativeNumber, representativeEmail,
  	  alternativeRepName, alternativeRepNumber, alternativeRepEmail, otherNumber1, otherNumber2, otherNumber3, otherNumber4, otherNumber5,
      otherEmail1, otherEmail2, otherEmail3, otherEmail4, otherEmail5,
      dnc1, dnc2, dnc3, dnc4, dnc5
      FROM customers, accounts, contacts, cases
      WHERE customers.customerRefNo = accounts.f_customerId
      AND contacts.f_accountNumber = accounts.accountNumber
      AND accounts.accountNumber = cases.f_accountNumber
      AND customers.f_clientId = ${clientId}
      AND cases.caseId = ?;`,
    recordId,
    function (err, res) {
      if (err) {
        console.log('getContactsForCase error: ', err);
        result(null, err);
      } else {
        console.log('getContactsForCase res: ', res);
        result(null, res);
      }
    }
  );
};

// Update
Model.updateOne = async function (table, clientId, id, model, result) {
  console.log('updateOne table: ', table);
  console.log('updateOne clientId: ', clientId);
  console.log('updateOne id: ', id);
  console.log('updateOne model: ', model);
  let arr = [];
  arr.push(model);

  await bulkUpdate(table, arr, id, function (err, res) {
    if (err) {
      console.log('updateOne error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// Function to update a json object without having to worry about the columns and values
// I have no idea why this isn't an out of the box function but there you have it...
// It's probably widely insecure but I'll look into that later
async function bulkUpdate(table, objectArray, id, callback) {
  let keys = Object.keys(objectArray[0]);
  let values = [];
  objectArray.map((obj) =>
    keys.map((key) => {
      if (key !== 'id') {
        if (obj[key] === 'NULL') obj[key] = null;
        obj[key] = ` ${key} = "${obj[key]}"`;
      }
      values.push(obj[key]);
    })
  );

  // determining which identifier to use based on the table name
  let identifier = '';
  switch (table) {
    case 'customers':
      identifier = 'customerRefNo';
      break;
    case 'accounts':
      identifier = 'accountNumber';
      break;
    case 'contacts':
      identifier = 'f_accountNumber';
      break;
    case 'cases':
      identifier = 'caseId';
      break;
    default:
      identifier = 'id';
      break;
  }

  // UPDATE {table} SET colname = ?, ...    WHERE id = ?;
  let sqlstatement = `UPDATE ${table} SET ${values} WHERE ${identifier} = "${id}";`;
  console.log('sqlstatement: ', sqlstatement);
  await sql.query(sqlstatement, function (error, results, fields) {
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
     AND cases.id = outcomes.f_caseId
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
         AND cases.id = outcomes.f_caseId
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