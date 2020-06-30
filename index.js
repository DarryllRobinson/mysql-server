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
const sql = require('./config/db');
const moment = require('moment');
//const crons = require('./cron.jobs/cron.jobs');

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static folder
app.use(express.static(__dirname + '/public'));

// enable all CORS requests
app.use(cors());

// log HTTP requests to a daily file
// create a rotating write stream
const accessLogStream = rfs.createStream('access.csv', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
});

/* Perhaps we will want to use specified fields at a later stage
app.use(morgan(function (tokens, req, res) {
  console.log('tokens: ', tokens);
  return [
    tokens.method(req, res), '-',
    tokens.url(req, res), '-',
    tokens.date(req, res), '-',
    tokens.status(req, res), '-',
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}, { stream: accessLogStream }));*/
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('tiny'));

// Cron jobs
//cron.schedule('*/2 * * * *', () => {
  //console.log('running a task every 2 minutes');
//});

//cron.schedule('0 1 * * *', () => {
  //console.log('running a task every hour - this is where the account update will come');
  //crons.createCustomers();
//});

cron.schedule('2 * * * * *', () => {
  console.log('running createCustomers');
  sql.query(`SELECT * FROM applications WHERE status = 'Approved' and booked is NULL;`, function(err, res) {
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
          createdBy: 'System'
        };

        sql.query(`INSERT INTO customers SET ?;`, customer, function(err, res) {
          if (err) {
            console.log('INSERT INTO customers error: ', err);
            //result(null, err);
          } else {
            console.log('INSERT INTO customers: ', res);
            let account = {
              paymentTermDays: 25,
              creditLimit: record.limit,
              paymentMethod: 'EFT',
              paymentDueDate: 25,
              debitOrderDate: 25,
              status: 'Current',
              createdBy: 'System',
              f_customerId: res.insertId
            };

            let booked = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            let recordId = record.id;
            console.log('recordId: ', recordId);

            sql.query(`UPDATE applications SET booked = '${booked}' WHERE id = ${record.id};`)

            sql.query(`INSERT INTO accounts SET ?;`, account, function(err, res) {
              if (err) {
                console.log('INSERT INTO accounts error: ', err);
                //result(null, err);
              } else {
                console.log('INSERT INTO accounts: ', res);
              }
            });

          }
        });

        //console.log('account: ', account);
        //console.log('customer: ', customer);
      });
    }
  })
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
