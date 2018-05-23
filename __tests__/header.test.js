'use strict';

const {
  isAscii,
  escapeNameString,
  shouldEncodedOrEscapeAddresses,
  utf8encode,
  encodeIfNeeded,
} = require('../lib/header');

describe('header generating functions', () => {
  test('isAscii', () => {
    expect(isAscii('Is that "war"?')).toBeTruthy();
    expect(isAscii('Это война')).toBeFalsy();
    expect(isAscii('😎 - cool!')).toBeFalsy();
  });

  test('escapeNameString', () => {
    expect(escapeNameString('John Doe')).toBe('John Doe');
    expect(escapeNameString('Phil "Cool Guy" Freo')).toBe(
      '"Phil \\"Cool Guy\\" Freo"',
    );
  });

  test('shouldEncodedOrEscapeAddresses', () => {
    expect(
      shouldEncodedOrEscapeAddresses([
        { name: 'Jack Sparrow, CPA', address: 'jack@example.com' },
        { name: 'John Smith', address: 'john@example.com' },
      ]),
    ).toBeFalsy();

    expect(
      shouldEncodedOrEscapeAddresses([
        { name: 'Vasya Pupkin', address: 'vasya@pupkin.com' },
        { name: 'Petya Ivanov', address: 'петя@иванов.рф' },
      ]),
    ).toBeTruthy();

    expect(
      shouldEncodedOrEscapeAddresses([
        { name: 'Vasya Pupkin', address: 'vasya@pupkin.com' },
        { name: 'Петя Иванов', address: 'petr@ivanov.com' },
      ]),
    ).toBeTruthy();
  });

  test('utf8encode', () => {
    expect(utf8encode('😎 - cool!')).toMatchSnapshot();
    expect(utf8encode('Василий Пупкин <vas@pup.in>')).toMatchSnapshot();
  });

  test('encodeIfNeeded', () => {
    expect(encodeIfNeeded('Simple text stays as is!')).toBe(
      'Simple text stays as is!',
    );
    expect(encodeIfNeeded('😎 text gonna be encoded')).toMatch(
      /^=\?utf-8\?B\?/,
    );
  });
});
