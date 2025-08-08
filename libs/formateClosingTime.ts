// utils/getClosingStatus.ts
import moment from 'moment';

/**
 * Returns human-readable closing time status based on current time.
 * @param closingTimeStr - Time in HH:mm:ss format (e.g. "18:00:00")
 * @returns string like "Closing in 2 hrs 30 mins" or "Closed"
 */
export function getClosingStatus(closingTimeStr: string): string {
  const now = moment();
  const closingTime = moment(closingTimeStr, "HH:mm:ss");

  // Set the closing time to today's date
  closingTime.set({
    year: now.year(),
    month: now.month(),
    date: now.date(),
  });

  if (closingTime.isBefore(now)) {
    return "Closed";
  }

  const duration = moment.duration(closingTime.diff(now));
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  return `Closing in ${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
}
