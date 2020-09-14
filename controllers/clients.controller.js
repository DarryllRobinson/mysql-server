const Client = require('../business/models/clients.model');

// List all
exports.list_all = function(req, res) {
  console.log('Client list_all req.params: ', req.params);
  const clientId = req.params.clientId;

  Client.getAll(clientId, function(err, clients) {
    if (err) {
      console.log('Client.getAll controller error: ', err);
    } else {
      res.send(clients);
    }
  });
}

// delete a user
exports.delete_user = function(req, res) {
  console.log('delete_user req.params: ', req.params);
  //const userId =
  Client.deleteUser(req.params.userId, function(err, user) {
    if (err) {
      console.log('deleteUser controller error: ', err);
    } else {
      res.send(user);
    }
  });
}

// update a user
exports.update_user = function(req, res) {
  console.log('update_user req.body: ', req.body);
  Client.updateUser(req.body, function(err, user) {
    if (err) {
      console.log('updateUser controller error: ', err);
    } else {
      res.send(user);
    }
  });
}

// change a password
exports.change_password = function(req, res) {
  //console.log('change_password req.params: ', req.params);
  console.log('change_password req.body: ', req.body);
  Client.changePassword(req.body.email, req.body, function(err, user) {
    if (err) {
      console.log('changePassword controller error: ', err);
    } else {
      if (user === 'User not found') {
        console.log('users.controller.change_password: ', user);
        res.send('User not found');
      } else {
        console.log('changePassword controller user: ', user);
        res.send(user);
      }
    }
  });
}

// reset a password
exports.reset_password = function(req, res) {
  console.log('reset_password req.body: ', req.body);
  Client.resetPassword(req.body, function(err, user) {
    if (err) {
      console.log('resetPassword controller error: ', err);
    } else {
      res.send(user);
    }
  });
}
