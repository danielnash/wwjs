const crypto = require('crypto');

const config = require(`${__base}/../config.js`);

module.exports = class HashFactory {
    static makeHash(value) {
        return crypto.createHash((config.crypto.algorithm || 'sha256'), config.crypto.secret).update(value).digest('base64');
    }
};