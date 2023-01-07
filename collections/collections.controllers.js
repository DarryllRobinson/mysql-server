const CollectionsModel = require('./collections.models');

// List top five collections records
exports.list_top_five = function (req, res) {
  CollectionsModel.getTopFiveRecords(function (err, collections) {
    if (err) {
      console.log('CollectionsModel.getTopFiveRecords controller error: ', err);
    } else {
      res.send(collections);
    }
  });
};

// Read specific collection record
exports.getOneCollectionRecord = function (req, res) {
  const { collection_id } = req.params;
  //console.log('Getting with collection_id: ' + req.params);
  CollectionsModel.getCollection(collection_id, function (err, collections) {
    if (err) {
      console.log('CollectionsModel.getCollection controller error: ', err);
    } else {
      res.send(collections);
    }
  });
};

// Update one collection
CollectionsModel.update_one_collection = function (req, res) {
  const { collection_id } = req.params;
  //console.log('Getting with collection_id: ' + req.params);
  CollectionsModel.update_one_collection(collection_id, function (
    err,
    collections
  ) {
    if (err) {
      console.log(
        'CollectionsModel.update_one_collection controller error: ',
        err
      );
    } else {
      res.send(collections);
    }
  });
};
