/**
 * rfc822 / RFC 1123 date formatting
 * 'Mon, 13 Sep 2013 14:27:00 +0200'
 * @see {@link https://tools.ietf.org/html/rfc822}
 * @see {@link https://github.com/tjconcept/js-rfc822-date}
 */

// This will output time like Tue, 30 Jun 2020, 19:18:52 UTC
// so we only need to replace UTC with GMT and remove last comma
const Formatter = new Intl.DateTimeFormat('en-GB', {
  minute: '2-digit',
  hour12: false,
  hour: '2-digit',
  second: '2-digit',
  day: '2-digit',
  month: 'short',
  weekday: 'short',
  year: 'numeric',
  timeZone: 'UTC',
  timeZoneName: 'short',
});

export function rfc822dateString(date: Date): string {
  // removing last comma between day and time
  // and replacing UTC with GMT
  return Formatter.format(date).replace(/^(.+)(,)([^,]+)(\sUTC)$/, '$1$3 GMT');
}
