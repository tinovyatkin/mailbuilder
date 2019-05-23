'use strict';

/**
 * @typedef {{ name: string, address: string }[]} AddressesArray
 */

const MAX_ASCII_CHAR_CODE = 127;

/**
 * Checks if given string contains only ASCII characters
 *
 * @see {@link http://stackoverflow.com/a/94049/1928484}
 * @see {@link https://github.com/ariporad/is-ascii/blob/master/index.js}
 *
 * @param {string} str
 * @returns {boolean}
 */
function isAscii(str) {
  for (let i = 0, strLen = str.length; i < strLen; ++i) {
    if (str.charCodeAt(i) > MAX_ASCII_CHAR_CODE) return false;
  }
  return true;
}
module.exports.isAscii = isAscii;

/**
 * Escapes disallowed ASCII characters in name-related headers, To:, From:, Bcc:
 *
 * @see {@link https://stackoverflow.com/questions/12008720/what-are-special-characters-in-e-mail-headers-and-when-to-use-quotes}
 * @see {@link https://github.com/closeio/addresscompiler/blob/e7d3fe06585d35e3dbd3d1594b7d9cb0b275b5f8/src/addresscompiler.js#L66}
 * @param {string} str
 * @returns {string}
 */
function escapeNameString(str) {
  if (!/^[\w ']*$/.test(str)) {
    if (/^[\x20-\x7e]*$/.test(str)) {
      return `"${str.replace(/(["\\])/g, '\\$1')}"`;
    }
  }
  return str;
}
module.exports.escapeNameString = escapeNameString;

/**
 * Checks whether given addresses array may be just escaped, or need to encoded
 *
 * @param {AddressesArray} addrArray
 * @returns {boolean} - true if need to be encoded
 */
function shouldEncodedOrEscapeAddresses(addrArray) {
  return addrArray.some(
    ({ name, address }) => !isAscii(name) || !isAscii(address),
  );
}
module.exports.shouldEncodedOrEscapeAddresses = shouldEncodedOrEscapeAddresses;

/**
 * Returns given string as Base64 UTF-8 encoded header
 *
 * @see {@link https://ncona.com/2011/06/using-utf-8-characters-on-an-e-mail-subject/}
 * @see {@link https://github.com/google/google-api-nodejs-client/blob/master/samples/gmail/send.js#L28}
 * @param {string} str
 * @returns {string}
 */
function utf8encode(str) {
  return `=?utf-8?B?${Buffer.from(str).toString('base64')}?=`;
}
module.exports.utf8encode = utf8encode;

/**
 * Builds RFC 2822 name-addr string based on address objects.
 *
 * Example input:
 *    {name: 'John Smith', address: 'john@example.com'}
 * Output:
 *    'John Smith <john@example.com>'
 *
 * Example input:
 *    [{name: 'Jack Sparrow, CPA', address: 'jack@example.com'}, {name: 'John Smith', address: 'john@example.com'}]
 * Output:
 *    '"Jack Sparrow, CPA" <jack@example.com>, John Smith <john@example.com>'
 *
 * Example input:
 *   [{name: 'Вася Пупкин', address: 'vasya@pupkin.com'}, {name: 'John Smith', address: 'john@example.com'}]
 * Output:
 *   =?utf-8?B?0JLQsNGB0LjQu9C40Lkg0J/Rg9C/0LrQuNC9IDx2YXNAcHVwLmluPg==?=
 *
 * @param {AddressesArray} addrArray
 * @returns {string}
 */
function getAddressesHeader(addrArray) {
  return addrArray
    .map(
      ({ name, address }) =>
        `${
          isAscii(name)
            ? escapeNameString(name)
            : utf8encode(name.normalize('NFC'))
        } <${address}>`,
    )
    .join(', ');
}
module.exports.getAddressesHeader = getAddressesHeader;

/**
 * Encodes header to UTF8 if required or returns as is
 *
 * @param {string} str
 * @returns {string}
 */
function encodeIfNeeded(str) {
  if (isAscii(str)) return str;
  return utf8encode(str);
}
module.exports.encodeIfNeeded = encodeIfNeeded;
