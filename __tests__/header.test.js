'use strict';

const {
  isAscii,
  escapeNameString,
  utf8encode,
  encodeIfNeeded,
} = require('../lib/header');

describe('header generating functions', () => {
  it('isAscii', () => {
    expect(isAscii('Is that "war"?')).toBeTruthy();
    expect(isAscii('Это война')).toBeFalsy();
    expect(isAscii('😎 - cool!')).toBeFalsy();
    expect(isAscii('Bárbara Vaz Fernandes')).toBeFalsy();
  });

  it('escapeNameString', () => {
    expect(escapeNameString('John Doe')).toBe('John Doe');
    expect(escapeNameString('Phil "Cool Guy" Freo')).toBe(
      '"Phil \\"Cool Guy\\" Freo"',
    );
  });

  it('utf8encode', () => {
    expect(utf8encode('😎 - cool!')).toMatchSnapshot();
    expect(utf8encode('Василий Пупкин <vas@pup.in>')).toMatchSnapshot();
  });

  it('encodeIfNeeded', () => {
    expect(encodeIfNeeded('Simple text stays as is!')).toBe(
      'Simple text stays as is!',
    );
    expect(encodeIfNeeded('😎 text gonna be encoded')).toMatch(
      /^=\?utf-8\?B\?/,
    );
  });
});
