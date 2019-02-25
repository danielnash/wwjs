const query = require('./db/query.js');

const UserNotFoundError = require('./errors/user-not-found.js');

const HashFactory = require('./utils/hash-factory.js');

module.exports = class UserManager {
    async getUsers() {
        return await query('SELECT * FROM users');
    }

    async getUserById(userId) {
        return new Promise((resolve, reject) => {
            query(`
                SELECT * FROM 
                    users 
                WHERE
                    id = ?
                `, 
                [userId]
            ).then((row) => {
                if (row.length === 0) {
                    reject(new UserNotFoundError());
                }

                resolve(row[0]);
            }).catch((err) => {
                reject(new UserNotFoundError());
            });
        });
    }

    // Resolve with the user object, or reject
    // with an error message if failed

    async loginUser(username, password) {
        return new Promise((resolve, reject) => {
            let hashedPass = HashFactory.makeHash(password);

            query(`
                SELECT * FROM
                    users
                WHERE
                    username = ? AND 
                    \`password\` = ?
            `, [
                username,
                hashedPass
            ]).then((rows) => {
                if (rows.length > 0) {
                    return resolve(rows[0]);
                }

                reject(new UserNotFoundError());
            });
        });
    }

    async updatePassword(userId, oldPass, newPass) {

        let newPassHashed = HashFactory.makeHash(newPass),
            oldPassHashed = HashFactory.makeHash(oldPass);

        const result = await query(`
            UPDATE
                users
            SET
                \`password\` = ?
            WHERE
                id = ? AND 
                \`password\` = ?
        `, [
            newPassHashed,

            userId,
            oldPassHashed
        ]);

        return (result.affectedRows > 0);
    }
}