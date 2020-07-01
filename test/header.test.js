import chai from 'chai';
import {
  isAscii,
  escapeNameString,
  utf8encode,
  encodeIfNeeded,
} from '../dist/header.js';

const { expect } = chai;

describe('header generating functions', function () {
  it('isAscii', function () {
    expect(isAscii('Is that "war"?')).to.be.true;
    expect(isAscii('Это война')).to.be.false;
    expect(isAscii('😎 - cool!')).to.be.false;
    expect(isAscii('Bárbara Vaz Fernandes')).to.be.false;
  });

  it('escapeNameString', function () {
    expect(escapeNameString('John Doe')).to.equal('John Doe');
    expect(escapeNameString('Phil "Cool Guy" Freo')).to.equal(
      '"Phil \\"Cool Guy\\" Freo"',
    );
  });

  it('utf8encode', function () {
    expect(utf8encode('😎 - cool!')).to.equal('=?utf-8?B?8J+YjiAtIGNvb2wh?=');
    expect(utf8encode('Василий Пупкин <vas@pup.in>')).to.equal(
      '=?utf-8?B?0JLQsNGB0LjQu9C40Lkg0J/Rg9C/0LrQuNC9IDx2YXNAcHVwLmluPg==?=',
    );
  });

  it('encodeIfNeeded', function () {
    expect(encodeIfNeeded('Simple text stays as is!')).to.equal(
      'Simple text stays as is!',
    );
    expect(encodeIfNeeded('😎 text gonna be encoded')).to.match(
      /^=\?utf-8\?B\?/,
    );
  });
});
