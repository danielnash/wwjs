const nodemailer = require('nodemailer');

const config = require(`${__base}/../config.js`);

const { logEmail } = require(`${__base}/utils/loggers.js`);

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

        if (Array.isArray(message.to) && message.to.length > 15) {
            let originalLength = message.to.length;
        
            message.to = message.to.slice(0, 15);

            console.log(`MESSAGE RECIPIENTS TRIMMED to 15 from ${originalLength}`);
        }

        const res = await transporter.sendMail(message);

        // For testing differnt resopnse dasmdasd
        // res.response = '421 Service not available, closing transmission channel';

        logEmail(res.envelope.from, res.accepted[0], (message.html || message.text), res.response);

        return res;
    }

}