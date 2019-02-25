/**
 *  Basic promise wrapper for MySQL query :)
 */

const conn = require('./connector.js');

module.exports = async (queryString, params) => {
    return new Promise((resolve, reject) => {
        conn.query(queryString, params, (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        });
    });
};