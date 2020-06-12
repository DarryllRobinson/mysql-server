const Comment = require('../models/comments.model');

// Read one
exports.read_item = function(req, res) {
  Comment.getOne(req.params.id, function(err, model) {
    if (err) {
      console.log('getOne controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}

// Update one ***** Possibly incredibly unsafe!
exports.update_item = function(req, res) {
  Comment.updateOne(req.params.id, req.body, function(err, model) {
    if (err) {
      console.log('updateOne controller error: ', err);
    } else {
      res.send(model);
    }
  }, req.table);
}
