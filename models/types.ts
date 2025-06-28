import React from "react";
export interface AppContextType {
 lang: 'en' | 'fr';
 setLang: React.Dispatch<React.SetStateAction<'en' | 'fr'>>;
 isSidebarOpen: boolean;
  toggleSidebar: () => void,
}