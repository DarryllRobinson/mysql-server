const Session = require('../models/sessions.model');

exports.auth_user = function(req, res) {
  console.log('Session.getUser req.body: ', req.body);
  Session.getUser(req.body.email, req.body.password, function(err, session) {
    if (err) {
      console.log('auth error: ', err);
    } else if (session[1].logged_in === false) {
      //console.log('Failed password authentication: ', session);
      res.send(session);
    } else {
      //console.log('controller auth_user session: ', session);
      //console.log('finding the logged_in value: ', session[1].logged_in);
      let response = [];
      let user = {
        firstName: session[0].firstName,
        surname: session[0].surname,
        email: session[0].email,
        role: session[0].role,
        storeId: session[0].storeId,
        clientId: session[0].f_clientId
      };

      response.push(user);
      response.push({logged_in: true});

      //console.log('Session response: ', response);
      res.send(response);
    }
  });
}

// Not used any more
exports.auth = function(req, res) {
  Session.getUser(req.body.email, req.body.password, function(err, session) {
    if (err) {
      console.log('auth error: ', err);
    } else {
      console.log('auth session: ', session);
      if (session.match) {
        let newSession = {
          email: req.body.email,
          loginDate: req.body.loginDate
        };

        Session.createSession(newSession, function(err, user) {
          if (err) {
            console.log('createSession controller error: ', err);
          } else {
            console.log('getUser response: ', user);
            let response = {
              firstName: session[0].firstName,
              surname: session[0].surname,
              email: user.email,
              role: session[0].role
            };
            console.log('Session response: ', response);
            res.send(response);
          }
        });
      } else {
        res.send('No match');
      }
    }
  });
}

// Read one
exports.xxxauth = function(req, res) {
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
