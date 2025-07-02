"use client";
import React, { createContext, useState } from "react";
import { PharmacyContextType } from "@/models/types";

export const PharmacyContext = createContext<PharmacyContextType | null>(null);

function PharmacyProvider({ children }: { children: React.ReactNode }) {
  const [showOnCall, setOnCall] = useState(false);
  const [showAddDrugForm, setDrugForm] = useState(false);
  const [showWorkingDaysForm, setWorkingDays] = useState(false);

  const values = {
    showOnCall,
    setOnCall,
    showAddDrugForm,
    setDrugForm,
    showWorkingDaysForm,
    setWorkingDays,
  };
  return <PharmacyContext value={values}>{children}</PharmacyContext>;
}

export default PharmacyProvider;
