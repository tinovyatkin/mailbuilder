import { rfc822dateString } from '../dist/lib/rfc-822-date.js';
import chai from 'chai';

const { expect } = chai;

describe('RFC822 date format function', function () {
  it('formats a date', function () {
    const date = new Date('27 July 2016 13:30:00 GMT+05:45');
    // https://gist.github.com/tleen/5109955
    expect(rfc822dateString(date)).to.equal('Wed, 27 Jul 2016 07:45:00 GMT');
  });
});
