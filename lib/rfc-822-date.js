/**
 * rfc822 / RFC 1123 date formatting
 * @see {@link https://github.com/tjconcept/js-rfc822-date}
 */

'use strict';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// https://jsperf.com/numpad2/1
const padTo2Digits = num => (num < 10 ? '0' : '') + num;

function getTZOString(timezoneOffset) {
  const prefix = timezoneOffset > 0 ? '-' : '+';
  const offsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  const offsetMinutes = Math.abs(timezoneOffset % 60);

  return prefix + padTo2Digits(offsetHours) + padTo2Digits(offsetMinutes);
}

module.exports = date =>
  `${DAYS[date.getDay()]}, ${padTo2Digits(date.getDate())} ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()} ${padTo2Digits(date.getHours())}:${padTo2Digits(
    date.getMinutes(),
  )}:${padTo2Digits(date.getSeconds())} ${getTZOString(
    date.getTimezoneOffset(),
  )}`;
