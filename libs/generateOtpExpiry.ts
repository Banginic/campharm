export function generateOtpExpiry(minutes: number = 5): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}