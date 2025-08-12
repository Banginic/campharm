import React from "react";
export interface AppContextType {
  lang: "en" | "fr" | string;
  setLang: React.Dispatch<React.SetStateAction<"en" | "fr" | string>>;
  isMainSidebarOpen: boolean;
  toggleMainSidebar: () => void;
  preferedTown: null | { region: string; city: string };
  setPreferedTown: React.Dispatch<
    React.SetStateAction<null | { region: string; city: string }>
  >;
  isPharmacySidebarOpen: boolean;
  togglePharmacySidebar: () => void;
  showModal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface WeeklyScheduleType {
  monday: { open: string | Date; close: string | Date; isOnCall: boolean };
  tuesday: { open: string | Date; close: string | Date; isOnCall: boolean };
  wednesday: { open: string | Date; close: string | Date; isOnCall: boolean };
  thursday: { open: string | Date; close: string | Date; isOnCall: boolean };
  friday: { open: string | Date; close: string | Date; isOnCall: boolean };
  saturday: { open: string | Date; close: string | Date; isOnCall: boolean };
  sunday: { open: string | Date; close: string | Date; isOnCall: boolean };
}

type APIResponse = { success: boolean; message?: string; error?: string };
export interface DrugType {
  id: string;
  genericName: string;
  tradeName?: string;
  dosageForm: string;
  dosageStrength: string;
  price?: number;
  pharmacyId: string;
  description?: string;
  inStock: boolean;
}
export interface DrugSearchType extends APIResponse {
  data:
    | {
        id: string;
        genericName: string;
        tradeName?: string;
        dosageForm: string;
        dosageStrength: string;
        price?: number;
        pharmacyId: string;
        description: string;
        inStock: boolean;
        pharmacyName: string;
        town: string;
      }[]
    | [];
}
export interface DrugTypes extends APIResponse {
  data: DrugType[] | [];
}

export interface PharmaciesDailySchedule extends APIResponse {
  data: {
    pharmacyId: number;
    pharmacyName: string;
    isOpen: false;
    day: string;
    closingTime: string;
    openingTime: string;
    isOnCall: boolean;
  }[] | []
}

export interface PharmaciesTypes extends APIResponse {
  data:
    | {
        id: number;
        pharmacyName: string;
        pharmacistName: string;
        region: string;
        town: string;
        phoneNumber: string;
        email: string;
        isVerified: boolean;
        isFrozen: boolean;
        createdAt: Date;
        updatedAt: Date;
        location:
          | {
              lon: number;
              lat: number;
            }
          | {};
        address: string;
        licenceNumber: string;
      }[]
    | [];
}
export interface PharmacyDetailsTypes extends APIResponse {
  data: {
  pharmacyId: number;             // assuming id is number
  pharmacyName: string;
  pharmacistName: string;
  isFrozen: boolean;
  phoneNumber: string;
  email: string;
  address: string;
  isVerified: string
  town: string;
  region: string;
  createdAt: string;              // ISO date string
  location: {
    lat: number;
    lng: number;
  };
  licenceNumber: string;
  isOpen: boolean;
  isOnCall: boolean;
  openingTime: string;
  closingTime: string;
  day: string;
      }[]
    | [];
}


interface Location {
  lat: number;
  lng: number;
}

export interface PharmacyDetails {
  id: number;
  pharmacyName: string;
  email: string;
  pharmacistName: string;
  phoneNumber: string;
  address: string;         // empty string in your example
  region: string;
  town: string;
  licenceNumber: string;
  location: Location;
  password: string;
  isFrozen: boolean;
  isVerified: boolean;
  createdAt: string;       // ISO date string
  updatedAt: string;       // ISO date string
}

export interface PharmacyContextType {
  showOnCall: boolean;
  setOnCall: React.Dispatch<React.SetStateAction<boolean>>;
  lang: "en" | "fr";
  setLang: React.Dispatch<React.SetStateAction<"en" | "fr">>;
  showAddDrugForm: boolean;
  setDrugForm: React.Dispatch<React.SetStateAction<boolean>>;
  showWorkingDaysForm: boolean;
  setWorkingDays: React.Dispatch<React.SetStateAction<boolean>>;
  pharmacyDetails: PharmacyDetails | null;
  setPharmacyDetails: React.Dispatch<
    React.SetStateAction<PharmacyDetails | null>
  >;
}
