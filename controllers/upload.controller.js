//const Upload = require('../models/upload.model');
const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, '_uploads');
    },
    filename: function (req, file, cb) {
      cb(null, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + '-' +file.originalname )
    }
});

const upload = multer({ //multer settings
  storage: storage
}).single('file');

// Read all
exports.single = function(req, res) {
  //console.log('req: ', req);
  //console.log('Trying to upload a document in upload.controller');
  upload(req, res, function(err) {
    if (err) {
      console.log('err_desc: ', err);
      res.json({
        error_code: 1,
        err_desc: err
      });
      return;
    }

    if (!req.file) {
      console.log("No file passed");
      res.json({
        error_code: 1,
        err_desc: "No file passed"
      });
      return;
    }

    console.log('Successful upload');
    res.json({ upload: 'success' });
    return;
  });
}
