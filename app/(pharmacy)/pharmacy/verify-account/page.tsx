"use client";
import { PharmacyContext } from "@/context/PharmacyProvider";
import React, { useContext } from "react";
import AccountVerification from "@/pages/AccountVerification";
import { Loading } from "@/components/index";

function page() {
  const pharmacyContext = useContext(PharmacyContext);
  return (
    <div>
      {!pharmacyContext ? (
        <Loading />
      ) : (
        <AccountVerification lang={pharmacyContext?.lang} pharmacyDetails={pharmacyContext?.pharmacyDetails} />
      )}
    </div>
  );
}

export default page;
