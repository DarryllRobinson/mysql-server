const Model = require('../models/sql.model');

// Read all
exports.list_all = function(req, res) {
  //console.log('req: ', req);
  Model.getAll(function(err, model) {
    if (err) {
      console.log('getAll controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

exports.list_all_by_clientId = function(req, res) {
  console.log('req.params: ', req.params);

  switch (req.params.workspace) {
    case 'applications':
      console.log('sql.controller pointing to getAllApplicationsByClientId');
      Model.getAllApplicationsByClientId(req.params.clientId, function(err, model) {
        if (err) {
          console.log('getAllApplicationsByClientId controller error: ', err);
        } else {
          res.send(model);
        }
      });
      break;
    case 'collections':
      console.log('sql.controller pointing to getAllCollectionsByClientId');
      Model.getAllCollectionsByClientId(req.params.clientId, function(err, model) {
        if (err) {
          console.log('getAllCollectionsByClientId controller error: ', err);
        } else {
          res.send(model);
        }
      });
      break;
    default:
      console.log('No req.params.workspace I know how to deal with: ', req.params.workspace);
  }
}

// Read all by clientId
exports.xxxlist_all_by_clientId = function(req, res) {
  console.log('req.params: ', req.params);
  Model.getAllById(req.params.workspace, req.params.clientId, function(err, model) {
    if (err) {
      console.log('getAllById controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

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
