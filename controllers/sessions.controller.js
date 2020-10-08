const Session = require('../admin/models/sessions.model');

exports.auth_user = function(req, res) {
  //console.log('Session.getUser req.headers: ', req.headers);
  Session.getUser(req.body.email, req.body.password, function(err, session) {
    if (err) {
      console.log('auth error: ', err);
    } else {
      res.send(session);
    }
  })
}

exports.oldauth_user = function(req, res) {
  //console.log('Session.getUser req.body: ', req.body);
  Session.getUser(req.body.email, req.body.password, function(err, session) {
    if (err) {
      console.log('auth error: ', err);
    } else if (session[1].logged_in === false) {
      console.log('Failed password authentication: ', session);
      res.send(session);
    } else {
      console.log('controller auth_user session: ', session);
      //console.log('controller auth_user session[0]: ', session[0]);
      //console.log('controller auth_user session[1]: ', session[1]);
      //console.log('controller auth_user session[2].token: ', session[2].token);
      //console.log('finding the logged_in value: ', session[1].logged_in);
      let response = [];
      let user = {
        firstName: session[0].firstName,
        surname: session[0].surname,
        email: session[0].email,
        role: session[0].role,
        type: session[0].type,
        storeId: session[0].storeId,
        clientId: session[0].f_clientId,
        active: session[0].active,
        token: session[2].token
      };

      response.push(user);
      response.push({
        logged_in: true,
        ok: true
      });

      //console.log('Session response: ', response);
      res.send(response);
    }
  });
}

exports.list_all_by_clientId = function(req, res) {
  Session.getServicesByClientId(req.params.clientId, function(err, session) {
    if (err) {
      console.log('getServicesByClientId controller error: ', err);
    } else {
      res.send(session);
    }
  });
}

exports.list_all_clients = function(req, res) {
  Session.getAllClients(function(err, session) {
    if (err) {
      console.log('getAllClients controller error: ', err);
    } else {
      res.send(session);
    }
  });
}

exports.create_user = function(req, res) {
  //console.log('req.body.email: ', req.body.email);
  // Check if user email address already exists
  Session.createUser(req.body, function(err, session) {
    if (err) {
      console.log('createUser controller error: ', err);
    } else {
      //console.log('model createUser: ', session);
      if (session === 'User exists') {
        res.send('User exists')
      } else {
        res.send(session);
      }
    }
  });
}

exports.list_all = function(req, res) {
  Session.getConfig(req.params.workspace, function(err, session) {
    if (err) {
      console.log('getConfig controller error: ', err);
    } else {
      res.send(session);
    }
  });
}



// Not used any more
exports.auth = function(req, res) {
  Session.getUser(req.body.email, req.body.password, function(err, session) {
    if (err) {
      console.log('auth error: ', err);
    } else {
      //console.log('auth session: ', session);
      if (session.match) {
        let newSession = {
          email: req.body.email,
          loginDate: req.body.loginDate
        };

        Session.createSession(newSession, function(err, user) {
          if (err) {
            console.log('createSession controller error: ', err);
          } else {
            //console.log('getUser response: ', user);
            let response = {
              firstName: session[0].firstName,
              surname: session[0].surname,
              email: user.email,
              role: session[0].role
            };
            //console.log('Session response: ', response);
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
      //console.log('res.req.body.email: ', res.req.body.email);
      Session.getUser(res.req.body.email, function(err, user) {
        if (err) {
          console.log('getUser controller error: ', err);
        } else {
          //console.log('getUser response: ', user);
          session = user;
          //console.log('Session session: ', session);
          res.send(session);
        }
      });
    }
  });
}

// Check if user is logged in using email address
exports.authCheck = function(req, res) {
  console.log('Is this used still? authCheck req.params.email: ', req.params.email);
  Session.checkAuth(req.params.email, function(err, session) {
    if (err) {
      console.log('checkAuth controller error: ', err);
    } else {
      //console.log('checkAuth: ', session);
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
