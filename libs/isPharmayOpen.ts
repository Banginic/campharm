// utils/isPharmacyOpen.ts
export function isPharmacyOpen(
  openingTime: string, // "08:00:00"
  closingTime: string, // "18:00:00"
  isOnCall: boolean
): boolean {
  if (isOnCall) return true; // On call always open

  const now = new Date();

  // Parse opening and closing times
  const [openH, openM, openS] = openingTime.split(":").map(Number);
  const [closeH, closeM, closeS] = closingTime.split(":").map(Number);

  const opening = new Date();
  opening.setHours(openH, openM, openS, 0);

  const closing = new Date();
  closing.setHours(closeH, closeM, closeS, 0);

  // Check if current time is within range
  return now >= opening && now <= closing;
}
