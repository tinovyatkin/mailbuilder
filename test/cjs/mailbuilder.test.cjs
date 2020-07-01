const { expect } = require('chai');
const { simpleParser } = require('mailparser');

const { simpleHtmlEmail } = require('../../');

describe('mailbuilder CommonJS output test', function () {
  it('simpleHtmlEmail', async function () {
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
    expect(res).to.equal(
      `Content-Type: text/html; charset=utf-8
Content-Transfer-Encoding: 8Bit
From: "John \\"Cool\\" Doe" <john@doe.com>
To: =?utf-8?B?0JLQsNGB0Y8g0J/Rg9C/0LrQuNC9?= <vasya@pupkin.com>
MIME-Version: 1.0
Bcc: One Spy <spy@kremlin.ru>, Big Eye <fbi@whitehouse.org>
Subject: =?utf-8?B?U29tZSDwn5KEIHN1YmplY3Q=?=

This is our <b>html</b> message content
      It's also <i>multiline</i> just in case`,
    );

    // testing with alternative full-blown library
    const parsed = await simpleParser(res);
    expect(parsed.headers.get('from')).to.have.property(
      'text',
      `${testMsg.from.name} <${testMsg.from.address}>`,
    );
    expect(parsed.headers.get('to')).to.have.property(
      'text',
      `${testMsg.to[0].name} <${testMsg.to[0].address}>`,
    );
    expect(parsed.subject).to.equal(testMsg.subject);
    expect(parsed.bcc).to.have.property('value').that.deep.equal(testMsg.bcc);
    expect(parsed.html).to.equal(testMsg.html);
  });
});
