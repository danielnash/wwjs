const UserManager = require('./../src/user-manager.js');

const UserNotFoundError = require('./../src/errors/user-not-found.js');

// Testing utils!
const TestUser = require('./utils/test-user.js');
const query = require('./../src/db/query.js');

function expectUserNotFound(error) {
    expect(error).toBeInstanceOf(UserNotFoundError);
}

// User manager instance to test with
const um = new UserManager();


beforeAll(() => {
    return TestUser.createTestUser();
});

afterAll(() => {
    return TestUser.destroyTestUser();
});

describe('UserManager - class for managing users of the application', () => {

    test('can pull all users', async () => {
        expect.assertions(2);

        const users = await um.getUsers();

        expect(users.length).toBeGreaterThan(0);

        expect(users[users.length - 1]).toMatchObject(TestUser.userNoPass);
    });

    test('can find a user by ID', async () => {
        expect.assertions(1);

        const user = await um.getUserById(TestUser.user.id);

        expect(user).toMatchObject(TestUser.userNoPass);
    });

    test('will reject getUserById() if invalid ID provided', async () => {
        expect.assertions(1);

        try {
            const user = await um.getUserById(-1);
        } catch (e) {
            expectUserNotFound(e);
        }
    });

    describe('correctly handles login - ', () => {

        test('with valid credentials', async () => {

            let prom = um.loginUser(TestUser.user.username, TestUser.user.password);

            await expect(prom)
                    .resolves
                    .toBeTruthy();

        });

        async function expectInvalidLogin(user, pass) {
            expect.assertions(1);

            try {
                const u = await um.loginUser(user, pass);
            } catch (e) {
                expectUserNotFound(e);
            }
        }

        test('with invalid password', async () => {

            await expectInvalidLogin(TestUser.user.username, '_INCORRECT_PASS_');

        });

        test('with invalid username', async () => {

            await expectInvalidLogin('_INCORRECT_USER_', TestUser.user.password);

        });

    });

    test('can update user password', async () => {
        expect.assertions(1);

        const newPass = 'n3wp:4s!&sw!0rd';

        await expect(um.updatePassword(
                TestUser.user.id, 
                TestUser.user.password,
                newPass
            ))
             .resolves
             .toBeTruthy();

    });

});