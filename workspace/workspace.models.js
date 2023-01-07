'use strict';
const sql = require('../config/db');

const Workspace = function (workspace) {
  this.createdDate = new Date();
};

Workspace.getTopFiveRecords = function (result) {
  sql.query(
    `SELECT caseId as id, caseNumber, amountDue, accountNumber, caseNotes, currentAssignment, currentBalance, customerName, debtorAge, nextVisitDateTime, regIdNumber, resolution, totalBalance, cases.updatedBy, cases.updatedDate
    FROM cws_business.customers, cws_business.accounts, cws_business.cases
    WHERE customers.customerRefNo = accounts.f_customerId
    AND accounts.accountNumber = cases.f_accountNumber;`,
    function (err, res) {
      if (err) {
        console.log('getTopFiveRecords error: ', err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Workspace;
