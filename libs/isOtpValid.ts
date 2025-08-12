/**
 * Checks if an OTP timestamp is still valid.
 * @param storedTimestamp - The OTP expiration timestamp stored in the database (ISO string or Date object).
 * @param validityMinutes - How many minutes the OTP should remain valid.
 * @returns boolean - True if still valid, false if expired.
 */
export function isOtpValid(
  storedTimestamp: string | Date,
  validityMinutes: number = 1
): boolean {
  const expiryTime = new Date(storedTimestamp).getTime();
  const currentTime = Date.now();

  return currentTime <= expiryTime;
}


