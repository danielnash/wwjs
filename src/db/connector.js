const mysql = require('mysql');

const config = require(`${__base}/../config.js`);

module.exports = mysql.createConnection({
    host: (config.database.host || '127.0.0.1'),
    user: (config.database.user || 'root'),
    password: (config.database.password || ''),
    database: (config.database.database || '__ww_test')
});