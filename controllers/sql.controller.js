const ConsumerModel = require('../consumer/models/sql.model');
const BusinessModel = require('../business/models/sql.model');

exports.list_all_by_clientId = function(req, res) {
  console.log('list_all_by_clientId req.params: ', req.params);

  switch (req.params.type) {
    case 'business':
      switch (req.params.workspace) {
        case 'applications':
          BusinessModel.getAllApplicationsByClientId(req.params.clientId, function(err, model) {
            if (err) {
              console.log('BusinessModel.getAllApplicationsByClientId controller error: ', err);
            } else {
              res.send(model);
            }
          });
          break;
        case 'collections':
          BusinessModel.getAllCollectionsByClientId(req.params.clientId, function(err, model) {
            if (err) {
              console.log('BusinessModel.getAllCollectionsByClientId controller error: ', err);
            } else {
              res.send(model);
            }
          });
          break;
        default:
          console.log('list_all_by_clientId unable to handle what came my way inside');
          break;
      }

    case 'consumer':
      switch (req.params.workspace) {
        case 'applications':
          console.log('list_all_by_clientId consumer applications');
          break;
        case 'collections':
          console.log('list_all_by_clientId consumer collections');
          break;
        default:
          console.log('list_all_by_clientId unable to handle what came my way inside');
          break;
      }
    default:
      console.log('list_all_by_clientId unable to handle what came my way outside: ', req.params);
      break;
  }
}

// Create one
exports.create_item = function(req, res) {
  console.log('create_item req.params: ', req.params);
  console.log('create_item req.body: ', req.body);

  switch (req.params.type) {
    case 'business':
      BusinessModel.createOne(req.params.workspace, req.body, function(err, model) {
        if (err) {
          console.log('BusinessModel.createOne controller error: ', err);
        } else {
          res.send(model);
        }
      }, req.table);
      break;
    case 'consumer':
      ConsumerModel.createOne(req.body, function(err, model) {
        if (err) {
          console.log('ConsumerModel.createOne controller error: ', err);
        } else {
          res.send(model);
        }
      //}, req.table);
      });
      break;
    default:

  }
}

/*
// Read all
exports.list_all = function(req, res) {
  //console.log('req: ', req);
  ConsumerModel.getAll(function(err, model) {
    if (err) {
      console.log('getAll controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

exports.list_all_by_clientId = function(req, res) {
  console.log('req.params: ', req.params);
  console.log('req.path: ', req.path);

  switch (req.params.workspace) {
    case 'applications':
      console.log('sql.controller pointing to getAllApplicationsByClientId');
      ConsumerModel.getAllApplicationsByClientId(req.params.type, req.params.clientId, function(err, model) {
        if (err) {
          console.log('getAllApplicationsByClientId controller error: ', err);
        } else {
          res.send(model);
        }
      });
      break;
    case 'collections':
      console.log('sql.controller pointing to getAllCollectionsByClientId');
      ConsumerModel.getAllCollectionsByClientId(req.params.type, req.params.clientId, function(err, model) {
        if (err) {
          console.log('getAllCollectionsByClientId controller error: ', err);
        } else {
          res.send(model);
        }
      });
      break;
    default:
      console.log('No req.params.workspace I do not know how to deal with: ', req.params.workspace);
  }
}

// Read all by clientId
exports.xxxlist_all_by_clientId = function(req, res) {
  console.log('req.params: ', req.params);
  ConsumerModel.getAllById(req.params.workspace, req.params.clientId, function(err, model) {
    if (err) {
      console.log('getAllById controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

// Create one
exports.create_item = function(req, res) {
  ConsumerModel.createOne(req.body, function(err, model) {
    if (err) {
      console.log('createOne controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

// Create many
exports.create_items = function(req, res) {
  ConsumerModel.createMany(req.body, function(err, model) {
    if (err) {
      console.log('createMany controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

// Read one
exports.read_item = function(req, res) {
  ConsumerModel.getOne(req.params.type, req.params.id, function(err, model) {
    if (err) {
      console.log('getOne controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

// Read one using foreign key
exports.f_read_item = function(req, res) {
  ConsumerModel.f_getOne(req.params.type, req.params.f_id, function(err, model) {
    if (err) {
      console.log('getOne controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

// Update one ***** Possibly incredibly unsafe!
exports.update_item = function(req, res) {
  console.log('req.params: ', req.params);
  console.log('req.body: ', req.body);
  ConsumerModel.updateOne(req.params.id, req.body, function(err, model) {
    if (err) {
      console.log('updateOne controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

// Delete one
exports.delete_item = function(req, res) {
  ConsumerModel.removeOne(req.params.id, function(err, model) {
    if (err) {
      console.log('removeOne controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}
*/
