/**
 * rfc822 / RFC 1123 date formatting
 * 'Mon, 13 Sep 2013 14:27:00 +0200'
 * @see {@link https://tools.ietf.org/html/rfc822}
 * @see {@link https://github.com/tjconcept/js-rfc822-date}
 */

const Formatter = new Intl.DateTimeFormat('en-US', {
  minute: '2-digit',
  hour12: false,
  hour: '2-digit',
  second: '2-digit',
  day: '2-digit',
  month: 'short',
  weekday: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

export function rfc822dateString(date: Date): string {
  // targeted result is
  // [weekday, ',', day, ' ', month, ' ', year, ' ', hours, ':', mins, ':', seconds, ' ', 'GMT'].join()
  return Formatter.formatToParts(date)
    .reduce(
      (res, { type, value }) => {
        switch (type) {
          case 'weekday':
            res[0] = value;
            break;

          case 'day':
            res[2] = value;
            break;

          case 'month':
            res[4] = value;
            break;

          case 'year':
            res[6] = value;
            break;

          case 'hour':
            res[8] = value;
            break;

          case 'minute':
            res[10] = value;
            break;

          case 'second':
            res[12] = value;
            break;
        }
        return res;
      },
      [
        'weekday',
        ', ',
        'day',
        ' ',
        'month',
        ' ',
        'year',
        ' ',
        'hour',
        ':',
        'minute',
        ':',
        'second',
        ' ',
        'GMT',
      ],
    )
    .join('');
}
