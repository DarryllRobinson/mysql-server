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
