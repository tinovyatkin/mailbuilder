'use strict';

const { simpleParser } = require('mailparser');

const { simpleHtmlEmail } = require('../lib/build');

describe('email message building', () => {
  test('simpleHtmlEmail', async () => {
    const testMsg = {
      from: { name: 'John "Cool" Doe', address: 'john@doe.com' },
      to: [{ name: 'Вася Пупкин', address: 'vasya@pupkin.com' }],
      bcc: [
        { name: 'One Spy', address: 'spy@kremlin.ru' },
        { name: 'Big Eye', address: 'fbi@whitehouse.org' },
      ],
      subject: 'Some 💄 subject',
      html: `This is our <b>html</b> message content
      It's also <i>multiline</i> just in case`,
    };
    const res = simpleHtmlEmail(testMsg);
    expect(res).toMatchSnapshot();

    // testing with alternative full-blown library
    const parsed = await simpleParser(res);
    expect(parsed.headers.get('from').text).toBe(
      `${testMsg.from.name} <${testMsg.from.address}>`,
    );
    expect(parsed.headers.get('to').text).toBe(
      `${testMsg.to[0].name} <${testMsg.to[0].address}>`,
    );
    expect(parsed.subject).toBe(testMsg.subject);
    expect(parsed.bcc.value).toEqual(expect.arrayContaining(testMsg.bcc));
    expect(parsed.html).toBe(testMsg.html);
  });
});
