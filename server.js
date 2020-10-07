const express = require('express');
const bodyParser = require('body-parser');
//const port = process.env.REACT_APP_STAGE === 'development' ? 8080 : 8081;
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const mysql = require('mysql');
const app = express();
const cron = require('node-cron');
const business_sql = require('./business/config/db');
const admin_sql = require('./admin/config/db');
const moment = require('moment');
const email = require('./controllers/email.controller');
//const crons = require('./cron.jobs/cron.jobs');

console.log('process.env.REACT_APP_STAGE: ', process.env.REACT_APP_STAGE);
let port = 0;
switch (process.env.REACT_APP_STAGE) {
  case 'development':
    port = 8080;
    break;
  case 'production':
    port = 8081;
    break;
  case 'sit':
    port = 8082;
    break;
  case 'uat':
    port = 8083;
    break;
  default:
    port = 0;
    break;
}

console.log('port: ', port);

// enhancing security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static folder
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3306"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//const fileDir = __dirname + '/_uploads';
//console.log('fileDir: ', fileDir);
console.log('__dirname: ', __dirname);

app.use(cors());

// log HTTP requests to a daily file
// create a rotating write stream
let accessLogStream = null;

if (process.env.REACT_APP_STAGE !== 'development') {
  accessLogStream = rfs.createStream('/log/access.csv', {
    interval: '1d', // rotate daily
    //path: path.join(__dirname, 'log')
  });
} else {
  accessLogStream = rfs.createStream('/log/access.csv', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
  });
}

morgan.token('user', function getUser (req) {
  return req.header("User");
});

morgan.token('ip', function getIp (req) {
  return req.ip;
});

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body);
});

app.use(morgan('[:date[iso]] :ip :user :method :url :status :body :response-time ms', { stream: accessLogStream }));

app.use(morgan('[:date[iso]] :ip :user :method :url :status :body :response-time ms'));

// Customer and Account creation cron
cron.schedule('*/1 * * * *', () => {
  console.log('running business_sql createCustomers');
  business_sql.query(`SELECT * FROM applications WHERE currentStatus = 'Approved' and bookedDate is NULL;`, function(err, res) {
    if (err) {
      console.log('business_sql createCustomers error: ', err);
      //result(null, err);
    } else {
      //console.log('createCustomers res: ', res[1]);
      //result(null, res);
      //let records = [];
      res.forEach(record => {
        let customer = {
          customerRefNo: record.customerRefNo,
          customerName: record.customerName,
          customerEntity: record.customerEntity,
          regIdNumber: record.regNumber,
          customerType: record.regIdNumber,
          productType: record.productType,
          address1: record.address1,
          address2: record.address2,
          address3: record.address3,
          address4: record.address4,
          address5: record.address5,
          f_clientId: record.f_clientId,
          createdBy: 'System'
        };

        business_sql.query(`INSERT INTO customers SET ?;`, customer, function(err, res) {
          if (err) {
            console.log('INSERT INTO business_sql customers error: ', err);
            //result(null, err);
          } else {
            //console.log('INSERT INTO customers: ', res);
            let account = {
              accountNumber: record.accountNumber,
              debtorAge: record.debtorAge,
              paymentTermDays: record.paymentTermDays,
              creditLimit: record.creditLimit,
              totalBalance: record.totalBalance,
              amountDue: record.amountDue,
              currentBalance: record.currentBalance,
              days30: record.days30,
              days60: record.days60,
              days90: record.days90,
              days120: record.days120,
              days150: record.days150,
              days180: record.days180,
              days180Over: record.days180Over,
              paymentMethod: record.paymentMethod,
              paymentDueDate: record.paymentDueDate,
              debitOrderDate: record.debitOrderDate,
              lastPaymentDate: record.lastPaymentDate,
              lastPaymentAmount: record.lastPaymentAmount,
              lastPTPDate: record.lastPTPDate,
              lastPTPAmount: record.lastPTPAmount,
              accountNotes: record.accountNotes,
              currentStatus: record.currentStatus,
              arg: record.arg,
              createdBy: record.createdBy,
              f_customerId: res.customerRefNo
            };

            let booked = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            let recordId = record.id;
            //console.log('recordId: ', recordId);

            business_sql.query(`UPDATE applications SET bookedDate = '${booked}' WHERE id = ${record.id};`)

            business_sql.query(`INSERT INTO accounts SET ?;`, account, function(err, res) {
              if (err) {
                console.log('INSERT INTO business_sql accounts error: ', err);
                //result(null, err);
              } else {
                console.log('INSERT INTO accounts: ', res.affectedRows);
              }
            });
          }
        });
      });
    }
  });
  console.log('business createCustomers complete');
});

// Cases due today or older email cron
const taskEmail = cron.schedule('*/1 * * * *', () => {
  console.log('running business_sql emailToday');
  business_sql.query(`SELECT * FROM cases
    WHERE cases.nextVisitDateTime > (Now() - interval 1440 minute)
    AND cases.nextVisitDateTime IS NOT NULL;`, function(err, res) {
      if (err) {
        console.log('business_sql emailToday error: ', err);
      } else {
        let usersRaw = [];
        res.forEach(record => {
          // get list of users
          usersRaw.push(record.currentAssignment);
        });

        const users = usersRaw.filter(onlyUnique);
        let api = "";
        switch (process.env.REACT_APP_STAGE) {
          case 'development':
            api = "http://localhost:3000/";
            break;
          case 'production':
            api = "https://thesystem.co.za/";
            break;
          case 'sit':
            api = "https://sit.thesystem.co.za/";
            break;
          case 'uat':
            api = "https://uat.thesystem.co.za/";
            break;
          default:
            port = 0;
            break;
        }

        users.forEach(user => {
          let casesArray = [];
          res.forEach((record, idx) => {
            if (record.currentAssignment === user) {
              casesArray[idx] = `<p>Case ID ${record.caseId} is due by ${record.nextVisitDateTime}. Click <a href="${api}workzone/collections/collection/${record.caseId}" >here</a> to be taken to the case.</p>`;
            }
          });
          let cases = casesArray.join('\n');

          // send email for each user
          const emailObject = {
            purpose: 'emailToday',
            //to: user,
            to: 'darryll@thesystem.co.za',
            subject: 'The System - Cases for today',
            text: 'Please go to your dashboard to see your work for today',
            html: `
              <p>Good morning. Below is your list of cases for today.</p>
              ${cases}
            `
          }

          email.send_today(emailObject);

        });


      }
    });

  console.log('business emailToday complete');
}, {
  scheduled: false
});

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

// Case and Outcome creation cron
// Don't run now as it confuses things when uploading cases via Excel spreadsheets
//cron.schedule('*/1 * * * *', () => {
/*  console.log('running createCases');
  business_sql.query(`SELECT * FROM accounts WHERE accountStatus <> 'Active' and caseDate is NULL;`, function(err, res) {
    if (err) {
      console.log('business_sql createCases error: ', err);
      //result(null, err);
    } else {
      //console.log('createCases res: ', res);
      //result(null, res);
      //let records = [];
      let count = 0;
      res.forEach(record => {
        let caseRecord = {
          createdBy: 'System',
          f_accountNumber: record.accountNumber
        };
          count++;

        let caseDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        let accountNumber = record.accountNumber;
        business_sql.query(`UPDATE accounts SET caseDate = '${caseDate}' WHERE accountNumber = '${accountNumber}';`, function(err, res) {
          if (err) {
            console.log('UPDATE business_sql accounts error: ', err);
          } else {
            //console.log('UPDATE accounts: ', res);
          }
        });

        business_sql.query(`INSERT INTO cases SET ?;`, caseRecord, function(err, res) {
          if (err) {
            console.log('INSERT INTO business_sql cases error: ', err);
          } else {
            //console.log('INSERT INTO cases: ', res);
            let caseId = res.insertId;

            let outcome = {
              f_caseNumber: caseId,
              createdBy: 'System'
            };

            business_sql.query(`INSERT INTO outcomes SET ?;`, outcome, function(err, res) {
              if (err) {
                console.log('INSERT INTO business_sql outcomes error: ', err);
              } else {
                //console.log('INSERT INTO business_sql outcomes: ', res.affectedRows);
              }
            });
          }
        });
      });
      console.log('INSERT INTO business_sql outcomes: ', count);
    }
  });
  console.log('business_sql createCases completed');
});*/

// Unlock Collections records that have been locked for more than 30 minutes
cron.schedule('*/1 * * * *', () => {
  console.log('running unlockCollections');
  business_sql.query(`UPDATE cases SET currentStatus = 'Open' WHERE currentStatus = 'Locked' AND lockedDatetime < (now() - interval 30 minute);`, function(err, res) {
    if (err) {
      console.log('unlockCollections error: ', err);
      //result(null, err);
    } else {
      console.log('Collections records unlocked: ', res.affectedRows);
    }
  });
});

app.listen(port);

console.log('API server started on: ' + port);

const routes = require('./routes/app.routes'); //importing Routes
routes(app); //register the route

app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log('Registered routes: ' + r.route.path)
  }
})
