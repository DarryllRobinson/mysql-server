const Session = require('../models/sessions.model');

// Read one
exports.auth = function(req, res) {
  Session.createSession(req.body, function(err, session) {
    if (err) {
      console.log('createSession controller error: ', err);
    } else {
      console.log('res.req.body.email: ', res.req.body.email);
      Session.getUser(res.req.body.email, function(err, user) {
        if (err) {
          console.log('getUser controller error: ', err);
        } else {
          console.log('getUser response: ', user);
          session = user;
          console.log('Session session: ', session);
          res.send(session);
        }
      });
    }
  });
}

// Check if user is logged in using email address
exports.authCheck = function(req, res) {
  console.log('authCheck req.params.email: ', req.params.email);
  Session.checkAuth(req.params.email, function(err, session) {
    if (err) {
      console.log('checkAuth controller error: ', err);
    } else {
      console.log('checkAuth: ', session);
      res.send(session);
    }
  });
}

// Delete session
exports.delete_item = function(req, res) {
  console.log('removeOne req.params.email: ', req.params.email);
  Session.removeOne(req.params.email, function(err, session) {
    if (err) {
      console.log('removeOne controller error: ', err);
    } else {
      res.send(session);
    }
  });
}
