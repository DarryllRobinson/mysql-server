const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const mysql = require('mysql');
const app = express();
const cron = require('node-cron');
const consumer_sql = require('./consumer/config/db');
const business_sql = require('./business/config/db');
const admin_sql = require('./admin/config/db');
const moment = require('moment');
//const crons = require('./cron.jobs/cron.jobs');

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static folder
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//const fileDir = __dirname + '/_uploads';
//console.log('fileDir: ', fileDir);

app.use(cors());

// log HTTP requests to a daily file
// create a rotating write stream
const accessLogStream = rfs.createStream('access.csv', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
});

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

// Logger configuration
/*const logConfiguration = {
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        //winston.
    )
};

// Create the logger
const logger = winston.createLogger(logConfiguration);

app.use((req, res, done) => {
    logger.info(req.body);
    logger.info(req.header("User"));
    console.log('req.body: ', req.body);
    done();
});*/


// Cron jobs
//cron.schedule('*/2 * * * *', () => {
  //console.log('running a task every 2 minutes');
//});

//cron.schedule('0 1 * * *', () => {
  //console.log('running a task every hour - this is where the account update will come');
  //crons.createCustomers();
//});

// Customer and Account creation cron
cron.schedule('* * 1 * * *', () => {
  console.log('running consumer_sql createCustomers');
  consumer_sql.query(`SELECT * FROM applications WHERE currentStatus = 'Approved' and bookedDate is NULL;`, function(err, res) {
    if (err) {
      console.log('createCustomers error: ', err);
      //result(null, err);
    } else {
      //console.log('createCustomers res: ', res[1]);
      //result(null, res);
      //let records = [];
      res.forEach(record => {
        let customer = {
          firstName: record.firstName,
          surname: record.surname,
          idNumber: record.idNumber,
          sex: record.sex,
          mobile: record.mobile,
          email: record.email,
          dob: record.dob,
          address1: record.address1,
          address2: record.address2,
          address3: record.address3,
          address4: record.address4,
          address5: record.address5,
          employer: record.employer,
          f_clientId: record.f_clientId,
          createdBy: 'System'
        };

        consumer_sql.query(`INSERT INTO customers SET ?;`, customer, function(err, res) {
          if (err) {
            console.log('INSERT INTO consumer_sqlcustomers error: ', err);
            //result(null, err);
          } else {
            //console.log('INSERT INTO customers: ', res);
            let account = {
              paymentTermDays: 25,
              creditLimit: record.limit,
              paymentMethod: 'EFT',
              paymentDueDate: 25,
              debitOrderDate: 25,
              currentStatus: 'Current',
              createdBy: 'System',
              f_customerId: res.insertId
            };

            let booked = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            let recordId = record.id;
            //console.log('recordId: ', recordId);

            consumer_sql.query(`UPDATE applications SET bookedDate = '${booked}' WHERE id = ${record.id};`)

            consumer_sql.query(`INSERT INTO accounts SET ?;`, account, function(err, res) {
              if (err) {
                console.log('INSERT INTO consumer_sqlaccounts error: ', err);
                //result(null, err);
              } else {
                //console.log('INSERT INTO accounts: ', res);
              }
            });
          }
        });
      });
    }
  });
  console.log('consumer_sql createCustomers complete');
});

// Case and Outcome creation cron
cron.schedule('* * 1 * * *', () => {
  console.log('running consumer_sql createCases');
  consumer_sql.query(`SELECT * FROM accounts WHERE currentStatus <> 'Current' and caseDate is NULL;`, function(err, res) {
    if (err) {
      console.log('consumer_sql createCases error: ', err);
      //result(null, err);
    } else {
      //console.log('createCases res: ', res);
      //result(null, res);
      //let records = [];
      res.forEach(record => {
        let caseRecord = {
          createdBy: 'System',
          f_accountNumber: record.accountNumber
        };

        let caseDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        let accountNumber = record.accountNumber;
        consumer_sql.query(`UPDATE accounts SET caseDate = '${caseDate}' WHERE accountNumber = ${accountNumber};`, function(err, res) {
          if (err) {
            console.log('UPDATE consumer_sql accounts error: ', err);
          } else {
            //console.log('UPDATE accounts: ', res);
          }
        });

        consumer_sql.query(`INSERT INTO cases SET ?;`, caseRecord, function(err, res) {
          if (err) {
            console.log('INSERT INTO consumer_sql cases error: ', err);
          } else {
            //console.log('INSERT INTO cases: ', res);
            let caseId = res.insertId;

            let outcome = {
              f_caseNumber: caseId,
              createdBy: 'System'
            };

            consumer_sql.query(`INSERT INTO outcomes SET ?;`, outcome, function(err, res) {
              if (err) {
                console.log('INSERT INTO consumer_sql outcomes error: ', err);
              } else {
                console.log('INSERT INTO consumer_sql outcomes: ', res);
              }
            });
          }
        });
      });
    }
  });
  console.log('consumer_sql createCases completed');
});

// Customer and Account creation cron
cron.schedule('* * 1 * * *', () => {
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
          firstName: record.firstName,
          surname: record.surname,
          idNumber: record.idNumber,
          sex: record.sex,
          mobile: record.mobile,
          email: record.email,
          dob: record.dob,
          address1: record.address1,
          address2: record.address2,
          address3: record.address3,
          address4: record.address4,
          address5: record.address5,
          employer: record.employer,
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
              paymentTermDays: 25,
              creditLimit: record.limit,
              paymentMethod: 'EFT',
              paymentDueDate: 25,
              debitOrderDate: 25,
              currentStatus: 'Current',
              createdBy: 'System',
              f_customerId: res.insertId
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
                //console.log('INSERT INTO accounts: ', res);
              }
            });
          }
        });
      });
    }
  });
  console.log('createCustomers complete');
});

// Case and Outcome creation cron
cron.schedule('* * 1 * * *', () => {
  console.log('running createCases');
  business_sql.query(`SELECT * FROM accounts WHERE currentStatus <> 'Current' and caseDate is NULL;`, function(err, res) {
    if (err) {
      console.log('business_sql createCases error: ', err);
      //result(null, err);
    } else {
      //console.log('createCases res: ', res);
      //result(null, res);
      //let records = [];
      res.forEach(record => {
        let caseRecord = {
          createdBy: 'System',
          f_accountNumber: record.accountNumber
        };

        let caseDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        let accountNumber = record.accountNumber;
        business_sql.query(`UPDATE accounts SET caseDate = '${caseDate}' WHERE accountNumber = ${accountNumber};`, function(err, res) {
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
                console.log('INSERT INTO business_sql outcomes: ', res);
              }
            });
          }
        });
      });
    }
  });
  console.log('business_sql createCases completed');
});

  /*sql.query(`SELECT * FROM accounts WHERE currentStatus <> 'Current' and caseDate is NULL;`, function(err, res) {
    if (err) {
      console.log('createCases error: ', err);
      //result(null, err);
    } else {
      console.log('createCases res: ', res[1]);
      //result(null, res);
      //let records = [];
      res.forEach(record => {
        let case = {
          createdBy: 'System',
          f_accountNumber: res.accountNumber
        };

        let caseDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        let recordId = record.id;
        console.log('recordId: ', recordId);

        sql.query(`UPDATE accounts SET caseDate = '${caseDate}' WHERE id = ${record.id};`);
      });
    });
  });*/
// Cancel applications that haven't been completed within 14 days
/*cron.schedule('* * 1 * * *', () => {
  console.log('running cancelApplications');
  sql.query(`UPDATE applications SET currentStatus = 'Cancelled' WHERE currentStatus = 'Open' and createdDate < (NOW() - 14);;`, function(err, res) {
    if (err) {
      console.log('cancelApplications error: ', err);
      //result(null, err);
    } else {
      console.log('Applications cancelled: ', res.affectedRows);
    }
  });
});*/

app.listen(port);

console.log('API server started on: ' + port);

const routes = require('./routes/app.routes'); //importing Routes
routes(app); //register the route

app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log('Registered routes: ' + r.route.path)
  }
})
