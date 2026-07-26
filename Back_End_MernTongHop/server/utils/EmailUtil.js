const nodemailer = require('nodemailer');
const MyConstants = require('./MyConstants');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: MyConstants.EMAIL_USER,
    pass: MyConstants.EMAIL_PASS
  }
});

const EmailUtil = {
  send(email, id, token) {
    const text = `Thanks for signing up, please verify your account by clicking this link:\nhttp://localhost:3000/api/customer/active?id=${id}&token=${token}`;
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: MyConstants.EMAIL_USER,
        to: email,
        subject: 'Account Verification',
        text: text
      };
      transporter.sendMail(mailOptions, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
};

module.exports = EmailUtil;
