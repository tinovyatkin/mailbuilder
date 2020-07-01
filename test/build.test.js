import chai from 'chai';
import mailparser from 'mailparser';

import { simpleHtmlEmail } from '../dist/index.js';

const { expect } = chai;
const { simpleParser } = mailparser;

describe('email message building', function () {
  it('simpleHtmlEmail', async function () {
    const testMsg = {
      from: { name: 'John "Cool" Doe', address: 'john@doe.com' },
      to: 'vasya@pupkin.com',
      bcc: [
        { address: 'spy@kremlin.ru' },
        { name: 'Big Eye', address: 'fbi@whitehouse.org' },
      ],
      date: new Date('29 July 2019 13:30:00 GMT-4'),
      subject: 'Some 💄 subject',
      html: `This is our <b>html</b> message content
      It's also <i>multiline</i> just in case`,
    };
    const res = simpleHtmlEmail(testMsg);
    expect(res).to.equal(
      `Content-Type: text/html; charset=utf-8
Content-Transfer-Encoding: 8Bit
From: "John \\"Cool\\" Doe" <john@doe.com>
To: vasya@pupkin.com
MIME-Version: 1.0
Date: Mon, 29 Jul 2019 17:30:00 GMT
Bcc: spy@kremlin.ru, Big Eye <fbi@whitehouse.org>
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
    expect(parsed.headers.get('to')).to.have.property('text', testMsg.to);
    expect(parsed.date).to.be.instanceOf(Date);
    expect(parsed.date.toISOString()).to.equal('2019-07-29T17:30:00.000Z');
    expect(parsed.subject).to.equal(testMsg.subject);
    expect(parsed.bcc)
      .to.have.property('value')
      .that.deep.equal([
        {
          name: '',
          ...testMsg.bcc[0],
        },
        testMsg.bcc[1],
      ]);
    expect(parsed.html).to.equal(testMsg.html);
  });
});
