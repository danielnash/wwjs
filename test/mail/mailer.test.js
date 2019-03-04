const Mailer = require(`${__base}/mail/mailer.js`);

/* 
    Mock the loggers, we don't want to really log but 
    want to make sure the function was run
*/

jest.mock(`${__base}/utils/loggers.js`);

const { logEmail } = require(`${__base}/utils/loggers.js`);

const TEST_EMAIL_RECIPIENT = 'dan@wizardsworkshop.co.uk';
const TEST_EMAIL_SENDER    = 'gang@localhost';

describe('Mailer - class for sending SMTP emails', () => {

    test('can send basic emails', async () => {

        const mailResult = await Mailer.sendMail({
            to: TEST_EMAIL_RECIPIENT,
            from: TEST_EMAIL_SENDER,
            subject: 'Anything!',
            text: 'Skrrrryyyy',
            html: '<b>Skrrrryyy</b> and skr'
        });

        expect(mailResult).toHaveProperty('accepted', [TEST_EMAIL_RECIPIENT] );

        expect(mailResult).toHaveProperty('rejected', []);

        expect(mailResult).toHaveProperty('response', '250 Ok');

        expect(mailResult).toHaveProperty('messageId');

        expect(mailResult.messageId).not.toHaveLength(0);

        expect(logEmail.mock.calls.length).toBe(1);

        expect(logEmail.mock)

    });

});