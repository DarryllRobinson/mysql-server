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
