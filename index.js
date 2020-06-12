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

app.listen(port);

console.log('API server started on: ' + port);

const routes = require('./routes/app.routes'); //importing Routes
routes(app); //register the route

app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log('Registered routes: ' + r.route.path)
  }
})
