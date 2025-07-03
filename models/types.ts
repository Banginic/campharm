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
}

export interface WeeklyScheduleType {
  monday: { open: '08:00', close: '18:00', isOnCall: boolean } | null;
  tuesday: { open: '08:00', close: '18:00', isOnCall: boolean } | null;
  wednesday: { open: '08:00', close: '18:00', isOnCall: boolean } | null;
  thursday: { open: '08:00', close: '18:00', isOnCall: boolean } | null;
  friday: { open: '08:00', close: '18:00', isOnCall: boolean } | null;
  saturday: { open: '08:00', close: '18:00', isOnCall: boolean } | null;
  sunday: { open: '08:00', close: '18:00', isOnCall: boolean } | null;

}

export interface DrugType {
  id: string;
  genericName: string;
  tradeName?: string;
  dosageForm: string;
  dosageStrength: string;
  price?: number;
  pharmacyId: string;
}
export interface PharmacyType {
  id: string;
  pharmacyName:string;
  pharmacistName: string; 
  isOpen: boolean;
  isOnCall: boolean;
  region: string;
  town: string;
  phoneNumber: string;
  email: string;
  isVerified: boolean;
  weeklySchedule?: WeeklyScheduleType;

}
export interface PharmacyContextType {
  showOnCall: boolean;
  setOnCall: React.Dispatch<React.SetStateAction<boolean>>;
  showAddDrugForm: boolean;
  setDrugForm: React.Dispatch<React.SetStateAction<boolean>>;
  showWorkingDaysForm: boolean;
  setWorkingDays: React.Dispatch<React.SetStateAction<boolean>>;
  pharmacyDetails: PharmacyType | null;
  setPharmacyDetails: React.Dispatch<React.SetStateAction<PharmacyType | null>>;
}
   
