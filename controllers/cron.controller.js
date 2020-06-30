const Cron = require('../models/cron.model');

// Get all
exports.get_all = function(req, res) {
  Cron.createCustomers(function(err, cron) {
    if (err) {
      console.log('createCustomers controller error: ', err);
    } else {
      console.log('cron: ', cron);
      res.send(cron);
    }
  });
}
/*
// Create one
exports.create_item = function(req, res) {
  Model.createOne(req.body, function(err, model) {
    if (err) {
      console.log('createOne controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

// Create many
exports.create_items = function(req, res) {
  Model.createMany(req.body, function(err, model) {
    if (err) {
      console.log('createMany controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

// Read one
exports.read_item = function(req, res) {
  Model.getOne(req.params.id, function(err, model) {
    if (err) {
      console.log('getOne controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

// Read one using foreign key
exports.f_read_item = function(req, res) {
  Model.f_getOne(req.params.f_id, function(err, model) {
    if (err) {
      console.log('getOne controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

// Update one ***** Possibly incredibly unsafe!
exports.update_item = function(req, res) {
  console.log('req.params.id: ', req.params.id);
  console.log('req.body: ', req.body);
  Model.updateOne(req.params.id, req.body, function(err, model) {
    if (err) {
      console.log('updateOne controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

// Delete one
exports.delete_item = function(req, res) {
  Model.removeOne(req.params.id, function(err, model) {
    if (err) {
      console.log('removeOne controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}
*/
