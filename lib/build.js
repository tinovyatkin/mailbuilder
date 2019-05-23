'use strict';

const rfc822dateString = require('./rfc-822-date');
const { getAddressesHeader, encodeIfNeeded } = require('./header');

/**
 * @typedef {{name: string, address: string}} AddressObject
 * @typedef {{ from: AddressObject, to: AddressObject[], bcc?: AddressObject[], date?: Date, subject?: string, html?: string, contentType?: string, attachments?: {}[] }} MailBuildingParams
 */

/**
 * @param {MailBuildingParams} options
 * @returns {string}
 */
function buildHeaders(options) {
  // require required
  if (typeof options.from !== 'object')
    throw new TypeError(
      `Parameter "from" is required and must be object with name/address properties`,
    );
  if (!Array.isArray(options.to))
    throw new TypeError('Parameter "to" must be an array');
  const res = [
    `Content-Type: ${options.contentType || 'text/html; charset=utf-8'}`,
    'Content-Transfer-Encoding: 8Bit',
    `From: ${getAddressesHeader([options.from])}`,
    `To: ${getAddressesHeader(options.to)}`,
    'MIME-Version: 1.0',
  ];
  if (options.date) res.push(`Date: ${rfc822dateString(options.date)}`);
  if (Array.isArray(options.bcc))
    res.push(`Bcc: ${getAddressesHeader(options.bcc)}`);
  if (options.subject) res.push(`Subject: ${encodeIfNeeded(options.subject)}`);
  return res.join('\n');
}
module.exports.buildHeaders = buildHeaders;

/**
 * Returns complete MIME-body of email message with only HTML body
 *
 * @param {MailBuildingParams} params
 * @returns {string}
 */
function simpleHtmlEmail(params) {
  if ('attachments' in params)
    throw new TypeError(
      `This function doesn't support building messages with attachments`,
    );
  if (typeof params.html !== 'string')
    throw new TypeError(
      `Build params must have "html" property with type of string`,
    );
  return `${buildHeaders(params)}\n\n${params.html}`;
}
module.exports.simpleHtmlEmail = simpleHtmlEmail;
