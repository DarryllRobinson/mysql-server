const Email = require('../admin/models/emailer');

// List all
exports.send_email = function(req, res) {
  console.log('Email send_email req.params: ', req.params);
  console.log('Email send_email req.body: ', req.body);

  const purpose = req.body.purpose;
  const to = req.body.to;
  const subject = req.body.subject;
  const text = `Error: ${req.body.error}\n\rFilename: ${req.body.fileName}\n\rUser: ${req.body.user}\n\rDate and time: ${req.body.dateTime}\n\rState: ${req.body.state}`;
  const html = `Error: ${req.body.error}\n\rFilename: ${req.body.fileName}\n\rUser: ${req.body.user}\n\rDate and time: ${req.body.dateTime}\n\rState: ${req.body.state}`;

  Email.sendEmail(purpose, to, subject, text, html, function(err, email) {
    if (err) {
      console.log('Email.sendEmail controller error: ', err);
    } else {
      res.send(email);
    }
  });
}
