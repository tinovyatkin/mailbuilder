# mailbuilder

## Simplified email message composition library for Node.js

![npm](https://img.shields.io/npm/v/mailbuilder.svg)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![codecov](https://codecov.io/gh/tinovyatkin/mailbuilder/branch/master/graph/badge.svg)](https://codecov.io/gh/tinovyatkin/mailbuilder)
![node](https://img.shields.io/node/v/mailbuilder.svg)

This is simple library (no dependencies) to generate HTML-only email messages (without attachments) from given parameters. Supports Unicode for names and subject, but encodes only when it's actually required:

```js
const { simpleHtmlEmail } = require("mailbuilder");

const testMsg = {
  from: { name: 'John "Cool" Doe', address: "john@doe.com" },
  to: [{ name: "Вася Пупкин", address: "vasya@pupkin.com" }],
  bcc: [
    { name: "One Spy", address: "spy@kremlin.ru" },
    { name: "Big Eye", address: "fbi@whitehouse.org" }
  ],
  subject: "Some 💄 subject",
  html: `This is our <b>html</b> message content
      It's also <i>multiline</i> just in case`
};
const res = simpleHtmlEmail(testMsg);

/**

res:
From: \\"John \\\\\\"Cool\\\\\\" Doe\\" <john@doe.com>
To: =?utf-8?B?0JLQsNGB0Y8g0J/Rg9C/0LrQuNC9IDx2YXN5YUBwdXBraW4uY29tPg==?=
Content-Type: text/html; charset=utf-8
MIME-Version: 1.0
Bcc: One Spy <spy@kremlin.ru>, Big Eye <fbi@whitehouse.org>
Subject: =?utf-8?B?U29tZSDwn5KEIHN1YmplY3Q=?=

This is our <b>html</b> message content
      It's also <i>multiline</i> just in case"

**/
```

### License

MIT
