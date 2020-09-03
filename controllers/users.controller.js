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
