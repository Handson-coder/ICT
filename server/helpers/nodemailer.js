const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
); // client id akun developer google oauth

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();

function sendNodemailer(emailTo, subject, text, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  let mailData = {};

  if (!text) {
    mailData = {
      from: "Handson",
      to: `${emailTo}`,
      subject: `${subject}`,
      html: `${html}`,
    };
  } else {
    mailData = {
      from: "Handson",
      to: `${emailTo}`,
      subject: `${subject}`,
      text: `${text}`,
    };
  }

  transporter.sendMail(mailData);
}

module.exports = sendNodemailer;
