// Log to the DB

const query = require(`${__base}/db/query.js`);

const LOG_PREFIX = '_log_';

// Get the real table name for a type of log
const logTable = (table) => {
    return LOG_PREFIX + table;
};

const logEmail = (fromMail, toMail, body, smtpResponse, userId = null) => {
    // Trim the SMTP message code from the beginning of the response message 
    let smtpStatus = parseInt(smtpResponse.match(/(^[0-9]{1,3})/, '')[0]);

    if (!smtpStatus) {
        console.error('Failed to derrive SMTP status code from message: ', smtpResponse);
        smtpStatus = 0;
    }

    query(`
        INSERT INTO 
        ${logTable('email')} (
            \`from\`,
            \`to\`,
            \`body\`,
            \`smtp_status\`,
            \`users_id\`
        ) VALUES (
            ?,
            ?,
            ?,
            ?,
            ?
        )
    `, [
        fromMail, 
        toMail, 
        body, 
        smtpStatus,
        userId
    ]);
};

module.exports = {
    logEmail
};