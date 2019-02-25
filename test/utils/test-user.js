/*
    Simple util class to create test users in the DB and remove them afterwards
*/

const query = require('./../../src/db/query.js');

const HashFactory = require('./../../src/utils/hash-factory.js');

const testUser = {
    username: 'ww_test__user',
    password: 'p3ngu1ns'
};

let testUserTemplate = {};

let testUserId = false;

module.exports = class TestUser {

    static createTestUser() {
        return new Promise((resolve, reject) => {
            query(`
                INSERT INTO users (
                    \`username\`,
                    \`password\`
                )
                VALUES (
                    ?,
                    ?
                );
            `, [
                testUser.username,
                HashFactory.makeHash(testUser.password)
            ]).then((result) => {
                testUserId 
                    = testUser.id 
                    = result.insertId;

                console.log(`Test user created! id: ${testUser.id}`);

                /* 
                    Clone our test user into the 'clean' template; we will
                    need this to compare with our results from the functions
                */

                testUserTemplate = Object.assign({}, testUser);

                // We know the password won't be returned to us; it will be hashed

                delete testUserTemplate.password;

                resolve(testUser);
            });
        });
    }

    /*
        It goes wthout saying this should always be called if createTestUser() is called
    */

    static destroyTestUser() {
        if (testUserId) {
            return query(`
                DELETE FROM
                    users
                WHERE
                    id = ?
            `, [testUserId]);
        }
    }

    static get user() {
        return testUser;
    }

    static get userNoPass() {
        return testUserTemplate;
    }

    static set user(user) {
        TestUser.user = user;
    }
}