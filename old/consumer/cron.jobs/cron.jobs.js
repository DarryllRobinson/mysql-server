'use strict'
const sql = require('../config/db');

const Cron = function(cron) {
  this.createdDate = new Date();
};

module.exports  createCustomers() {
  console.log('creating customers');
  sql.query(`SELECT * FROM applications WHERE status = 'Approved';`, function(err, res) {
    if (err) {
      console.log('createCustomers error: ', err);
      result(null, err);
    } else {
      console.log('createCustomers res: ', res);
      //result(null, res);
    }
  });
};



//module.exports = Cron;
