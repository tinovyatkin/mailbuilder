import type { AddressesArray } from './interfaces';

/**
 * Checks if given string contains only ASCII characters
 *
 * @see {@link https://catonmat.net/my-favorite-regex}
 */
export const isAscii = RegExp.prototype.test.bind(/^[ -~]*$/);

/**
 * Escapes disallowed ASCII characters in name-related headers, To:, From:, Bcc:
 *
 * @see {@link https://stackoverflow.com/questions/12008720/what-are-special-characters-in-e-mail-headers-and-when-to-use-quotes}
 * @see {@link https://github.com/closeio/addresscompiler/blob/e7d3fe06585d35e3dbd3d1594b7d9cb0b275b5f8/src/addresscompiler.js#L66}
 * @param {string} str
 * @returns {string}
 */
export function escapeNameString(str: string): string {
  if (!/^[\w ']*$/.test(str)) {
    if (/^[\x20-\x7e]*$/.test(str)) {
      return `"${str.replace(/(["\\])/g, '\\$1')}"`;
    }
  }
  return str;
}

/**
 * Checks whether given addresses array may be just escaped, or need to encoded
 *
 * @param {AddressesArray} addrArray
 * @returns {boolean} - true if need to be encoded
 */
export function shouldEncodedOrEscapeAddresses(
  addrArray: AddressesArray,
): boolean {
  return addrArray.some(
    ({ name, address }) => (name && !isAscii(name)) || !isAscii(address),
  );
}

/**
 * Returns given string as Base64 UTF-8 encoded header
 *
 * @see {@link https://ncona.com/2011/06/using-utf-8-characters-on-an-e-mail-subject/}
 * @see {@link https://github.com/google/google-api-nodejs-client/blob/master/samples/gmail/send.js#L28}
 * @param {string} str
 * @returns {string}
 */
export function utf8encode(str: string): string {
  return `=?utf-8?B?${Buffer.from(str).toString('base64')}?=`;
}

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
export function getAddressesHeader(addrArray: AddressesArray): string {
  return addrArray
    .map(({ name, address }) =>
      name
        ? `${
            isAscii(name)
              ? escapeNameString(name)
              : utf8encode(name.normalize('NFC'))
          } <${address}>`
        : address,
    )
    .join(', ');
}

/**
 * Encodes header to UTF8 if required or returns as is
 *
 * @param {string} str
 * @returns {string}
 */
export function encodeIfNeeded(str: string): string {
  if (isAscii(str)) return str;
  return utf8encode(str);
}
