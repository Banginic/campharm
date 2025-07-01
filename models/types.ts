import React from "react";
export interface AppContextType {
 lang: 'en' | 'fr' | string;
 setLang: React.Dispatch<React.SetStateAction<'en' | 'fr' | string>>;
 isSidebarOpen: boolean;
  toggleSidebar: () => void,
  preferedTown: null | { region: string, city: string },
  setPreferedTown: React.Dispatch<React.SetStateAction< null | { region: string, city: string}>>
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

   
