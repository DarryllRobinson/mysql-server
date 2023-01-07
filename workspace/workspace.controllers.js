const WorkspaceModel = require('./workspace.models');

// List top five workspace records
exports.list_top_five = function (req, res) {
  WorkspaceModel.getTopFiveRecords(function (err, workspace) {
    if (err) {
      console.log('WorkspaceModel.getTopFiveRecords controller error: ', err);
    } else {
      res.send(workspace);
    }
  });
};
