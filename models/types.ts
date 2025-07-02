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
}

   
