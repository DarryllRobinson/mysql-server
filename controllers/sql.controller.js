const ConsumerModel = require('../consumer/models/sql.model');
const BusinessModel = require('../business/models/sql.model');

// List all records
exports.list_all = function(req, res) {
  console.log('list_all req.params: ', req.params);
  const type = req.params.type;
  const workspace = req.params.workspace;
  const task = req.params.task;
  const clientId = req.params.clientId;

  // Determine which type
  switch (type) {
    case 'business':
      console.log('business');
      switch (task) {
        case 'list_all':
          BusinessModel.getAllCollections(clientId, function(err, model) {
            if (err) {
              console.log('BusinessModel.getAllCollections controller error: ', err);
            } else {
              res.send(model);
            }
          });
          break;
        // shouldn't be needed any longer
        case 'list_today':
          BusinessModel.getAllCollectionsForToday(clientId, function(err, model) {
            if (err) {
              console.log('BusinessModel.getAllCollectionsForToday controller error: ', err);
            } else {
              res.send(model);
            }
          });
          break;
        // shouldn't be needed any longer
        case 'list_all_report':
          BusinessModel.getAllForReport(clientId, function(err, model) {
            if (err) {
              console.log('BusinessModel.getAllForReport controller error: ', err);
            } else {
              res.send(model);
            }
          });
          break;
        default:
          console.log('task not found: ', task);
          res.send(task);
          break;
      }
      break;
    case 'consumer':
      console.log('consumer');
      switch (task) {
        case 'list_all':
          ConsumerModel.getAllCollections(clientId, function(err, model) {
            if (err) {
              console.log('ConsumerModel.getAllCollections controller error: ', err);
            } else {
              res.send(model);
            }
          });
          break;
        case 'list_today':
          ConsumerModel.getAllCollectionsForToday(clientId, function(err, model) {
            if (err) {
              console.log('ConsumerModel.getAllCollectionsForToday controller error: ', err);
            } else {
              res.send(model);
            }
          });
          break;
        default:
          console.log('task not found: ', task);
          res.send(task);
          break;
      }
    default:
      console.log('type not found: ', type);
      res.send(type);
      break;
    }
}

// List all records
exports.list_today = function(req, res) {
  console.log('list_today req.params: ', req.params);
  const type = req.params.type;
  const workspace = req.params.workspace;
  const task = req.params.task;
  const clientId = req.params.clientId;
  const user = req.params.user;

  // Determine which type
  switch (type) {
    case 'business':
      console.log('business');
      switch (task) {
        case 'list_today':
          BusinessModel.getAllCollectionsForToday(clientId, user, function(err, model) {
            if (err) {
              console.log('BusinessModel.getAllCollectionsForToday controller error: ', err);
            } else {
              res.send(model);
            }
          });
          break;
        default:
          console.log('task not found: ', task);
          res.send(task);
          break;
      }
      break;
    case 'consumer':
      console.log('consumer');
      switch (task) {
        case 'list_today':
          ConsumerModel.getAllCollectionsForToday(clientId, user, function(err, model) {
            if (err) {
              console.log('ConsumerModel.getAllCollectionsForToday controller error: ', err);
            } else {
              res.send(model);
            }
          });
          break;
        default:
          console.log('task not found: ', task);
          res.send(task);
          break;
      }
    default:
      console.log('type not found: ', type);
      res.send(type);
      break;
    }
}

// Create one
exports.create_item = function(req, res) {
  console.log('create_item req.params: ', req.params);
  const type = req.params.type;
  const workspace = req.params.workspace;
  const task = req.params.task;
  const clientId = req.params.clientId;

  // Determine which type
  switch (type) {
    case 'business':
      console.log('create_item business');
      BusinessModel.createOne(workspace, req.body, function(err, model) {
        if (err) {
          console.log('createOne controller error: ', err);
        } else {
          res.send(model);
        }
      });
      break;
    case 'consumer':
      console.log('create_item consumer');
      res.send(type);
      break;
    default:
      console.log('create_item type not found: ', type);
      res.send(type);
      break;
  }
}

// Create many
exports.create_items = function(req, res) {
  console.log('create_items req.params: ', req.params);
  const type = req.params.type;
  const workspace = req.params.workspace;
  const task = req.params.task;
  const clientId = req.params.clientId;

  // Determine which type
  switch (type) {
    case 'business':
      console.log('create_items business');
      BusinessModel.createMany(workspace, req.body, function(err, model) {
        if (err) {
          console.log('createMany controller error: ', err);
        } else {
          res.send(model);
        }
      });
      break;
    case 'consumer':
      console.log('create_items consumer');
      res.send(type);
      break;
    default:
      console.log('create_items type not found: ', type);
      res.send(type);
      break;
  }
}

// Read one
exports.read_item = function(req, res) {
  console.log('read_item req.params: ', req.params);
  const type = req.params.type;
  const workspace = req.params.workspace;
  const task = req.params.task;
  const clientId = req.params.clientId;
  const recordId = req.params.recordId;

  // Determine which type
  switch (type) {
    case 'business':
      console.log('read_item business');
      if (workspace === 'collections' && task === 'read_item') {
        BusinessModel.getOneCase(workspace, clientId, recordId, function(err, model) {
          if (err) {
            console.log('getOneCase controller error: ', err);
          } else {
            res.send(model);
          }
        });
      } else if (workspace === 'collections' && task === 'read_outcomes') {
        console.log('read_outcomes business');
        BusinessModel.getOutcomesForCase(workspace, clientId, recordId, function(err, model) {
          if (err) {
            console.log('getOne controller error: ', err);
          } else {
            res.send(model);
          }
        });
      } else if (workspace === 'collections' && task === 'read_contacts') {
        console.log('read_contacts business');
        BusinessModel.getContactsForCase(workspace, clientId, recordId, function(err, model) {
          if (err) {
            console.log('getOne controller error: ', err);
          } else {
            res.send(model);
          }
        });
      } else {
        BusinessModel.getOne(workspace, clientId, recordId, function(err, model) {
          if (err) {
            console.log('getOne controller error: ', err);
          } else {
            res.send(model);
          }
        });
      }
      break;
    case 'consumer':
      console.log('read_item consumer');
      res.send(type);
      break;
    default:
      console.log('read_item type not found: ', type);
      res.send(type);
      break;
  }
}

// Update one ***** Possibly incredibly unsafe!
exports.update_item = function(req, res) {
  console.log('update_item req.params: ', req.params);
  const type = req.params.type;
  const workspace = req.params.workspace;
  const task = req.params.task;
  const clientId = req.params.clientId;
  const recordId = req.params.recordId;
  console.log('update_item req.body: ', req.body);

  // Determine which type
  switch (type) {
    case 'business':
      BusinessModel.updateOne(workspace, clientId, recordId, req.body, function(err, model) {
        if (err) {
          console.log('updateOne controller error: ', err);
        } else {
          res.send(model);
        }
      });
      break;
    case 'consumer':
      console.log('update_item consumer');
      res.send(type);
      break;
    default:
      console.log('update_item type not found: ', type);
      res.send(type);
      break;
  }
}

/*exports.list_all_by_clientId = function(req, res) {
  console.log('list_all_by_clientId req.params: ', req.params);
  const type = req.params.type;
  const workspace = req.params.workspace;
  const task = req.params.task;
  const clientId = req.params.clientId;

  switch (type) {
    case 'business':
      switch (workspace) {
        case 'applications':
          console.log('business applications');
          BusinessModel.getAllApplicationsByClientId(type, workspace, task, clientId, function(err, model) {
            if (err) {
              console.log('BusinessModel.getAllApplicationsByClientId controller error: ', err);
            } else {
              res.send(model);
            }
          });
          //break;
        case 'collections':
          console.log('business collections');
          BusinessModel.getAllCollectionsByClientId(type, workspace, task, clientId, function(err, model) {
            if (err) {
              console.log('BusinessModel.getAllCollectionsByClientId controller error: ', err);
            } else {
              res.send(model);
            }
          });
          //break;
        default:
          console.log('default');
          console.log('list_all_by_clientId unable to handle what came my way outside: ', req.params.workspace);
          res.send('error');
          //break;
      }
    case 'consumer':
      switch (workspace) {
        case 'applications':
          console.log('consumer applications');
          ConsumerModel.getAllApplicationsByClientId(type, workspace, task, clientId, function(err, model) {
            if (err) {
              console.log('ConsumerModel.getAllApplicationsByClientId controller error: ', err);
            } else {
              res.send(model);
            }
          });
          //break;
        case 'collections':
          console.log('consumer collections');
          ConsumerModel.getAllCollectionsByClientId(type, workspace, task, clientId, function(err, model) {
            if (err) {
              console.log('ConsumerModel.getAllCollectionsByClientId controller error: ', err);
            } else {
              res.send(model);
            }
          });
          //break;
        default:
          console.log('default');
          console.log('list_all_by_clientId unable to handle what came my way inside: ', req.params.workspace);
          res.send('error');
          //break;
      }
    default:
      console.log('default');
      console.log('list_all_by_clientId unable to handle what came my way outside: ', req.params.type);
      res.send('error');
      //break;
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
