"use client";
import React, { createContext, useEffect, useState } from "react";
import { PharmacyDetails, PharmacyContextType } from "@/models/types";

export const PharmacyContext = createContext<PharmacyContextType | null>(null);

function PharmacyProvider({ children }: { children: React.ReactNode }) {
  const [showOnCall, setOnCall] = useState(false);
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [showAddDrugForm, setDrugForm] = useState(false);
  const [showWorkingDaysForm, setWorkingDays] = useState(false);
  const [pharmacyDetails, setPharmacyDetails] = useState<PharmacyDetails | null>(null);

  // Load pharmacy details from localStorage (only in browser)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("pharmacyDetails");
      if (stored) setPharmacyDetails(JSON.parse(stored));
    }
  }, []);

  const values: PharmacyContextType = {
    showOnCall,
    setOnCall,
    lang,
    setLang,
    showAddDrugForm,
    setDrugForm,
    showWorkingDaysForm,
    setWorkingDays,
    pharmacyDetails,
    setPharmacyDetails,
  };

  return <PharmacyContext.Provider value={values}>{children}</PharmacyContext.Provider>;
}

export default PharmacyProvider;
