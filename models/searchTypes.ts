
type APIResponse = { success: boolean, message?: string, error?: string}

export interface PharmacyDrugSchedule extends APIResponse {
 data: {
     pharmacyName: string;
  region: string;
  town: string;
  address: string;
  pharmacyId: number;
  phoneNumber: string;

  // Daily schedule
  day: string | null;
  isOpen: boolean | null;
  isOnCall: boolean | null;
  openingTime: string | null; // use `Date` if it's returned as a full datetime
  closingTime: string | null;

  // Drug info
  drugId: number | null;
  genericName: string | null;
  tradeName: string | null;
  dosageForm: string | null;
  dosageStrength: string | null;
  price: number | null;
  description: string | null;
 } [] | []
}
