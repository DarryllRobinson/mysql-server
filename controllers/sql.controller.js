const Model = require('../models/sql.model');

exports.list_all = function(req, res) {
  Model.getAll(function(err, model) {
    if (err) {
      console.log('getAll controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

exports.create_item = function(req, res) {
  const new_item = req.body;
  Model.createOne(new_item, function(err, model) {
    if (err) {
      console.log('createOne controller error: ', err);
    } else {
      console.log('create_item model: ', model);
      res.send(model);
    }
  }, req.table);
}

// Read
exports.read_item = function(req, res) {
  Model.getOne(req.params.id, function(err, model) {
    if (err) {
      console.log('getOne controller error: ', err);
    } else {
      console.log('read_item model: ', model);
      res.send(model);
    }
  }, req.table);
}

// Update
exports.update_item = function(req, res) {
  Model.updateOne(req.params.id, req.body, function(err, model) {
    if (err) {
      console.log('updateOne controller error: ', err);
    } else {
      console.log('update_item model: ', model);
      res.send(model);
    }
  }, req.table);
}

// Delete
exports.delete_item = function(req, res) {
  Model.removeOne(req.params.id, function(err, model) {
    if (err) {
      console.log('removeOne controller error: ', err);
    } else {
      console.log('delete_item model: ', model);
      res.send(model);
    }
  }, req.table);
}
