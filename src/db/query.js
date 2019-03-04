/**
 *  Basic promise wrapper for MySQL query :)
 */

const conn = require('./connector.js');

const query = async function(queryString, params) {
    return new Promise((resolve, reject) => {
        conn.query(queryString, params, (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        });
    });
};

query.first = async function(queryString, params) {
    const result = await this.apply(null, arguments);

    if (result.length > 0) {
        return result[0];
    }

    return null;
};

query.insertId = async function(queryString, params) {
    const result = await this.apply(null, arguments);

    return result.insertId > 0 ? result.insertId : null;
};

module.exports = query;