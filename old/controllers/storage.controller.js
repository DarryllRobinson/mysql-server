//const Upload = require('../models/upload.model');
const multer = require('multer');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

/*const download = multer({ //multer settings
  storage: storage
}).single('file');*/

const fileDir = '/Users/darryllrobinson/Documents/projects/mysql-server/_uploads/';//path.join(__dirname, '/_uploads');


// Upload a single document
exports.single_upload = function(req, res) {
  console.log('single_upload params: ', req.params);
  /*
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

  //console.log('req: ', req);
  //console.log('Trying to upload a document in storage.controller');
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
  });*/
  return;
}

// Download a single document
exports.single_download = function(req, res) {
  //console.log('req.params: ', req.params);
  //console.log('fileDir: ', fileDir);
  //console.log('Trying to download a document in storage.controller');

  const fileName = fileDir + req.params.id;
  fs.readFile(fileName, (err, data) => {
    if (err) res.status(500).send(err);
    res.contentType('application/pdf')
      .send(`data:application/pdf;base64,${new Buffer.from(data).toString('base64')}`);
  });
}
