'use strict';

const moment = require('moment');

const rfc822date = require('../lib/rfc-822-date');

test('rfc822 date format', () => {
  const date = new Date('27 July 2016 13:30:00 GMT+05:45');
  // https://gist.github.com/tleen/5109955
  expect(rfc822date(date)).toBe(
    moment(date).format('ddd, DD MMM YYYY HH:mm:ss ZZ'),
  );
});
