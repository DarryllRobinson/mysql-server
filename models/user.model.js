'use strict'
const sql = require('../config/db.js');
import moment from 'moment';

const User = function(user) {
  this.user = user.user;
  this.status = user.status;
  this.createdDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
};

User.
