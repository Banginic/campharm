"use client";
import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";

function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("en");
  const [isMainSidebarOpen, setMainSidebar] = useState(false);
  const [isPharmacySidebarOpen, setPharmacySidebar] = useState(false);
  const [preferedTown, setPreferedTown] = useState<null | {
    region: string;
    city: string;
  }>(null);

  function toggleMainSidebar() {
    setMainSidebar((prev) => !prev);
  }
  function togglePharmacySidebar() {
    setPharmacySidebar((prev) => !prev);
  }

  const values = {
    lang,
    setLang,
    isMainSidebarOpen,
    toggleMainSidebar,
    preferedTown,
    setPreferedTown,
    isPharmacySidebarOpen,
    togglePharmacySidebar,
  };
  useEffect(() => {
    function checkStorage() {
      const town = localStorage.getItem("preferedTown");
      if (town !== null) {
        const cityObj = JSON.parse(town);
        setPreferedTown(cityObj);
      }
    }
    checkStorage();
  }, []);
  return <AppContext value={values}>{children}</AppContext>;
}

export default AppProvider;
