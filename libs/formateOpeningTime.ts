// utils/getOpeningStatus.ts
import moment from 'moment';

/**
 * Returns status message based on pharmacy opening time.
 * @param openingTimeStr - Opening time in HH:mm:ss format (e.g. "08:00:00")
 * @returns string like "Open" or "Opening in 2 hrs 15 mins"
 */
export function getOpeningStatus(openingTimeStr: string): string {
  const now = moment();
  const openingTime = moment(openingTimeStr, "HH:mm:ss");

  // Set opening time to today
  openingTime.set({
    year: now.year(),
    month: now.month(),
    date: now.date(),
  });

  if (openingTime.isSameOrBefore(now)) {
    return "Open";
  }

  const duration = moment.duration(openingTime.diff(now));
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  return `In ${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
}
