const UserManager = require('./src/user-manager.js');

const um = new UserManager();

(async () => {
    const users = await um.getUsers();

    const user = await um.loginUser('dan', 'penguin');

    console.log(user);

    // const firstUser = await um.getUserById(1);

    // console.log('me!', firstUser);

    // await um.updatePassword(firstUser.id, firstUser.password, 'penguin');
})();