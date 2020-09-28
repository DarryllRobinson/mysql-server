const UserModel = require('../admin/models/users.model');

// List all users
exports.list_all_users = function(req, res) {
  console.log('list_all_users req.params: ', req.params);
  const clientId = req.params.clientId;

  UserModel.getAllUsers(clientId, function(err, users) {
    if (err) {
      console.log('UserModel.getAllUsers controller error: ', err);
    } else {
      res.send(users);
    }
  });
}

// delete a user
exports.delete_user = function(req, res) {
  console.log('delete_user req.params: ', req.params);
  //const userId =
  UserModel.deleteUser(req.params.userId, function(err, user) {
    if (err) {
      console.log('deleteUser controller error: ', err);
    } else {
      res.send(user);
    }
  });
}

// deactivate a user
exports.deactivate_user = function(req, res) {
  console.log('deactivate_user req.params: ', req.params);
  UserModel.deactivateUser(req.params, function(err, user) {
    if (err) {
      console.log('deactivateUser controller error: ', err);
    } else {
      res.send(user);
    }
  });
}

// reactivate a user
exports.reactivate_user = function(req, res) {
  console.log('reactivate_user req.params: ', req.params);
  UserModel.reactivateUser(req.params, function(err, user) {
    if (err) {
      console.log('reactivateUser controller error: ', err);
    } else {
      res.send(user);
    }
  });
}

// update a user
exports.update_user = function(req, res) {
  console.log('update_user req.body: ', req.body);
  UserModel.updateUser(req.body, function(err, user) {
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
  UserModel.changePassword(req.body.email, req.body, function(err, user) {
    if (err) {
      console.log('changePassword controller error: ', err);
    } else if (user === 'User not found') {
      console.log('users.controller.change_password: ', user);
      res.send('User not found');
    } else {
      console.log('changePassword controller user: ', user);
      res.send(user);
    }
  });
}

// reset a password
exports.reset_password = function(req, res) {
  console.log('reset_password req.body: ', req.body);
  UserModel.resetPassword(req.body, function(err, user) {
    if (err) {
      console.log('resetPassword controller error: ', err);
    } else {
      res.send(user);
    }
  });
}
