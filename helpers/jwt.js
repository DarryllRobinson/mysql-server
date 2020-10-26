const expressJwt = require('express-jwt');
const config = require('../admin/config/config.json');

module.exports = jwt;

function jwt() {
  const { secret } = config;
  return expressJwt({ secret, algorithms: ['HS256'] }).unless({
    path: [
      // public routes that don't require authentication
      '/api/admin/sessions/',
      '/api/admin/email',
      '/api/admin/error_email'
    ]
  });
}
