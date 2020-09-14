const Client = require('../admin/models/clients.model');

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

// Add a client
exports.create_client = function(req, res) {
  console.log('create_client req.body: ', req.body);
  //const clientId =
  Client.addClient(req.body, function(err, client) {
    if (err) {
      console.log('addClient controller error: ', err);
    } else {
      res.send(client);
    }
  });
}

// delete a client
exports.delete_client = function(req, res) {
  console.log('delete_client req.params: ', req.params);
  //const clientId =
  Client.deleteClient(req.params.clientId, function(err, client) {
    if (err) {
      console.log('deleteClient controller error: ', err);
    } else {
      res.send(client);
    }
  });
}

// update a client
exports.update_client = function(req, res) {
  console.log('update_client req.body: ', req.body);
  Client.updateClient(req.body, function(err, client) {
    if (err) {
      console.log('updateClient controller error: ', err);
    } else {
      res.send(client);
    }
  });
}

// change a password
exports.change_password = function(req, res) {
  //console.log('change_password req.params: ', req.params);
  console.log('change_password req.body: ', req.body);
  Client.changePassword(req.body.email, req.body, function(err, client) {
    if (err) {
      console.log('changePassword controller error: ', err);
    } else {
      if (client === 'Client not found') {
        console.log('clients.controller.change_password: ', client);
        res.send('Client not found');
      } else {
        console.log('changePassword controller client: ', client);
        res.send(client);
      }
    }
  });
}

// reset a password
exports.reset_password = function(req, res) {
  console.log('reset_password req.body: ', req.body);
  Client.resetPassword(req.body, function(err, client) {
    if (err) {
      console.log('resetPassword controller error: ', err);
    } else {
      res.send(client);
    }
  });
}
