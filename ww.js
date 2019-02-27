// Bootstrap all we need (the __base var comes from here)
require('./src/ww-bootstrap.js')();

const UserManager = require(`${__base}/user-manager.js`);
const Mailer = require(`${__base}/mail/mailer.js`);

const um = new UserManager();

(async _ => {
    const users = await um.getUsers();

    const user = await um.loginUser('dan', 'penguin');

    let mailResult = await Mailer.sendMail({
        to: 'daniel@shocklogic.com',
        from: 'gang@localhost',
        subject: 'Some gang stuff',
        text: 'Skrrrryyyy',
        html: '<b>Skrrrryyy</b> and skr'
    });

    console.log(mailResult);

    // console.log('Gona', mailResult);

    // const firstUser = await um.getUserById(1);

    // console.log('me!', firstUser);

    // await um.updatePassword(firstUser.id, firstUser.password, 'penguin');
})().catch(err => {
    console.log('Application error!', err);
});