const nodemailer = require('nodemailer');

const config = require('./../../config.js');

const transporter = nodemailer.createTransport({
    host: (config.mail.host || 'localhost'),
    port: (config.mail.port || 2500),
    secure: false
});

// If we can't connect to SMTP then throw an error

transporter.verify(function(error, success) {
    if (error) {
        throw new Error(error);
    }
});

module.exports = class Mailer {
    static async sendMail(message) {
        return await transporter.sendMail(message);
    }
}