"use client";
import { PharmacyContext } from "@/context/PharmacyProvider";
import React, { useContext } from "react";
import AccountVerification from "@/pages/AccountVerification";
import { Loading } from "@/components/index";

function page() {
  const { lang, pharmacyDetails } = useContext(PharmacyContext)!;
  return (
    <div>
      {!pharmacyDetails ? (
        <Loading />
      ) : (
        <AccountVerification lang={lang} pharmacyDetails={pharmacyDetails} />
      )}
    </div>
  );
}

export default page;
