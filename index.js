const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
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

// log HTTP requests
app.use(morgan('combined'));

//app.post('/xxxupload', (req, res) => res.send('Hello World!'));

app.listen(port);

console.log('API server started on: ' + port);

app.get('/', function(req, res) {
  res.json('Let us get started!');
})

//const routes = require('./app/routes/appRoutes'); //importing Routes
//routes(app); //register the route

app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log('Registered routes: ' + r.route.path)
  }
})
