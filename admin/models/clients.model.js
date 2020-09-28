'use strict'
const sql = require('../config/db');
const bcrypt = require ('bcryptjs');
const Emailer = require('../models/emailer');

const Client = function(client) {
  this.createdDate = new Date();
};

// List all
Client.getAllClients = function(clientId, result) {
  sql.query(`SELECT * FROM clients WHERE f_clientId = ?
    order by email asc;`, clientId, function(err, res) {
    if (err) {
      console.log('getAllClients error: ', err);
      result(null, err);
    } else {
      console.log('getAllClients res: ', res);
      result(null, res);
    }
  });
}

// Create
Client.addClient = function(client, result) {
  console.log('addClient client: ', client);
  sql.query(`INSERT INTO clients SET ?;`, client, function(err, res) {
    if (err) {
      console.log('addClient error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

// Create clientservices
Client.addClientService = function(client, result) {
  console.log('addClientService client: ', client);
  sql.query(`INSERT INTO clientservices SET ?;`, client, function(err, res) {
    if (err) {
      console.log('addClientService error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

// Delete
Client.deleteClient = function(clientId, result) {
  console.log('deleteClient clientId: ', clientId);
  sql.query(`DELETE FROM clients WHERE id = ?;`, [clientId], function(err, res) {
    if (err) {
      console.log('deleteClient error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

// Deactivate
Client.deactivateClient = function(clientId, result) {
  console.log('deactivateClient clientId: ', clientId);
  sql.query(`UPDATE clients SET active = 0 WHERE id = ?;`, clientId.clientId, function(err, res) {
    if (err) {
      console.log('deactivateClient error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

// Reactivate
Client.reactivateClient = function(clientId, result) {
  console.log('reactivateClient clientId: ', clientId);
  sql.query(`UPDATE clients SET active = 1 WHERE id = ?;`, clientId.clientId, function(err, res) {
    if (err) {
      console.log('reactivateClient error: ', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
}

// Reset a password
Client.resetPassword = function(client, result) {
  const email = client.email;
  console.log('resetPassword email: ', email);
  sql.query(`SELECT email FROM clients WHERE email = ?;`, [email], function(err, res) {
    if (err) {
      console.log('resetPassword error: ', err);
      result(null, err);
    } else {
      console.log('resetPassword res: ', res);
      if (res.length > 0) {
        let href = "";
        switch (process.env.REACT_APP_STAGE) {
          case 'development':
            href = "http://localhost:3000/reset";
            break;
          case 'production':
            href = "https://thesystem.co.za/reset";
            break;
          case 'sit':
            href = "https://sit.thesystem.co.za/reset";
            break;
          case 'uat':
            href = "https://uat.thesystem.co.za/reset";
            break;
          default:
            port = 0;
            break;
        }
        Emailer.sendEmail(
          'reset',
          email,
          'The System password reset request',
          'You requested a password reset',
          `
            <p>We received a request to reset your password on The System.</p>
            <p>Please click <a href=${href} target="_blank">here</a> to be taken to the password reset page.</p>
            <br /><br />
            <p>The System Team</p>
          `
        );
        result(null, res);
      } else {
        result(null, 'Client not found');
      }
    }
  });
}

// Change a password
Client.changePassword = function(email, change, result) {
  console.log('changePassword change email: ', email);
  console.log('changePassword change object: ', change);
  const id = email;
  sql.query(`SELECT email FROM cws_admin.clients WHERE email = ?;`, email, function(err, res) {
    if (err) {
      console.log('changePassword error: ', err);
      result(null, err);
    } else if (res.length === 0) {
      console.log('changePassword Client not found');
      result(null, 'Client not found');
    } else {
      console.log('changePassword res: ', res);
      const password = change.password;
      console.log('changePassword password: ', password);
      let arr = [];
      arr.push(change);

      bulkUpdate('clients', arr, id, function(err, res) {
        if (err) {
          console.log('changePassword error: ', err);
          result(null, err);
        } else {
          Emailer.sendEmail(
            'reset_confirmation',
            email,
            'The System password reset complete',
            'The System password reset complete',
            `
              <p>Your password on The System has been successfully changed.</p>
              <p>Please contact your supervisor immediately if you did not request the change.</p>
              <br /><br />
              <p>The System Team</p>
            `
          );
          result(null, res);
        }
      });
    }
  });
}

// Update
Client.updateClient = async function(id, client, result) {
  let arr = [];
  arr.push(client);

  await bulkUpdate('clients', arr, id, function(err, res) {
    if (err) {
      console.log('updateClient error: ', err);
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
  let sqlstatement = `UPDATE ${table} SET${values} WHERE email = "${id}";`;
  await sql.query(sqlstatement, function(error, results, fields) {
    if (error) return callback(error);
    callback(null, results);
  });
}

module.exports = Client;
