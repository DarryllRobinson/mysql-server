"use strict";
const nodemailer = require("nodemailer");
const constants = require('../../.stuff.js');

// async..await is not allowed in global scope, must use a wrapper
const Emailer = async function(email) {
  console.log('email in const: ', email);
};

Emailer.sendEmail = async function(email, firstName) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.thesystem.co.za",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'robot@thesystem.co.za', // generated ethereal user
      pass:  constants.emailPass// generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "robot@thesystem.co.za", // sender address
    to: email, // list of receivers
    subject: "Welcome to The System", // Subject line
    text: "Welcome to The System", // plain text body
    html: `
          <p>${firstName}, you have been registered as a new user on The System.</p>
          <p>Please click <a href="https://thesystem.co.za" target="_blank">here</a> to be taken to the login page. Your password will be sent to you by your supervisor.</p>
          <br /><br />
          <p>The System Team</p>
          `, // html body
  });

  //console.log("Message sent: %s", info.messageId);
  console.log("Message sent to: %s", info);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

Emailer().catch(console.error);

module.exports = Emailer;
