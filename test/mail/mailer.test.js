const Mailer = require(`${__base}/mail/mailer.js`);

const TEST_EMAIL_RECIPIENT = 'dan@wizardsworkshop.co.uk';
const TEST_EMAIL_SENDER    = 'gang@localhost';

describe('Mailer - class for sending SMTP emails', () => {

    test('can send basic emails', async () => {

        const mailResult = await Mailer.sendMail({
            to: TEST_EMAIL_RECIPIENT,
            from: TEST_EMAIL_SENDER,
            subject: 'Some gang stuff',
            text: 'Skrrrryyyy',
            html: '<b>Skrrrryyy</b> and skr'
        });

        expect(mailResult).toHaveProperty('accepted', [TEST_EMAIL_RECIPIENT] );

        expect(mailResult).toHaveProperty('rejected', []);

        expect(mailResult).toHaveProperty('response', '250 Ok');

        expect(mailResult).toHaveProperty('messageId');

        expect(mailResult.messageId).not.toHaveLength(0);

    });

});