"use client";
import React, { createContext, useEffect, useState } from "react";
import { PharmacyType } from "@/models/types";
import { PharmacyContextType } from "@/models/types";

export const PharmacyContext = createContext<PharmacyContextType | null>(null);

function PharmacyProvider({ children }: { children: React.ReactNode }) {
  const [showOnCall, setOnCall] = useState(false);
  const [showAddDrugForm, setDrugForm] = useState(false);
  const [showWorkingDaysForm, setWorkingDays] = useState(false);
  const [pharmacyDetails, setPharmacyDetails] = useState<PharmacyType | null>(
    null
  );
 
  useEffect(() => {
    function checkStoredDetails() {
      const pharmacyDetails = localStorage.getItem("pharmacyDetails");
      if (pharmacyDetails) {
        setPharmacyDetails(JSON.parse(pharmacyDetails));
      }
    }
    checkStoredDetails();

    return () => {};
  }, []);
  const values = {
    showOnCall,
    setOnCall,
    showAddDrugForm,
    setDrugForm,
    showWorkingDaysForm,
    setWorkingDays,
    pharmacyDetails,
    setPharmacyDetails,
  };
  return <PharmacyContext value={values}>{children}</PharmacyContext>;
}

export default PharmacyProvider;
