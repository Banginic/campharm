import React from "react";
export interface AppContextType {
 lang: 'en' | 'fr' | string;
 setLang: React.Dispatch<React.SetStateAction<'en' | 'fr' | string>>;
 isMainSidebarOpen: boolean;
  toggleMainSidebar: () => void,
  preferedTown: null | { region: string, city: string },
  setPreferedTown: React.Dispatch<React.SetStateAction< null | { region: string, city: string}>>
  isPharmacySidebarOpen: boolean;
  togglePharmacySidebar: () => void;
  showModal: boolean;
  setModal:React.Dispatch<React.SetStateAction< boolean>>
}

export interface WeeklyScheduleType {
  monday: { open: string | Date, close: string | Date, isOnCall: boolean };
  tuesday: { open: string | Date, close: string | Date, isOnCall: boolean };
  wednesday: { open: string | Date, close: string | Date, isOnCall: boolean };
  thursday: { open: string | Date, close: string | Date, isOnCall: boolean };
  friday: { open: string | Date, close: string | Date, isOnCall: boolean };
  saturday: { open: string | Date, close: string | Date, isOnCall: boolean };
  sunday: { open: string | Date, close: string | Date, isOnCall: boolean };

}

type APIResponse = { success: boolean, message?: string, error?: string}
export interface DrugType {
  id: string;
  genericName: string;
  tradeName?: string;
  dosageForm: string;
  dosageStrength: string;
  price?: number;
  pharmacyId: string;
  description?: string;
  inStock: boolean
}
export interface DrugTypes extends APIResponse {
  data: DrugType[] | []
}
export interface PharmacyType {
  id: number;
  pharmacyName:string;
  pharmacistName: string; 
  isOpen: boolean;
  isOnCall: boolean;
  region: string;
  town: string;
  phoneNumber: string;
  email: string;
  isVerified: boolean;
  isFrozen: boolean;
  createdAt: Date;
  updatedAt: Date;
  weeklySchedule: WeeklyScheduleType;

}
export interface PharmaciesTypes extends APIResponse {
  data: PharmacyType [] | []
}


export interface PharmacyContextType {
  showOnCall: boolean;
  setOnCall: React.Dispatch<React.SetStateAction<boolean>>;
  lang: 'en' | 'fr';
  setLang: React.Dispatch<React.SetStateAction<'en' | 'fr'>>;
  showAddDrugForm: boolean;
  setDrugForm: React.Dispatch<React.SetStateAction<boolean>>;
  showWorkingDaysForm: boolean;
  setWorkingDays: React.Dispatch<React.SetStateAction<boolean>>;
  pharmacyDetails: PharmacyType | null;
  setPharmacyDetails: React.Dispatch<React.SetStateAction<PharmacyType | null>>;
}
   
