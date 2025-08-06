"use client";
import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { PharmacyDetailsTypes } from "@/models/types";
import {
  PharmacyOnCallStatus,
  PharmacyStatus,
  PharmacyTotalDrugs,
  PharmacyHeroCTA,
  // CurrentDate,
  HeroTotalOrders,
  HeroPharmacyName,
} from "@/components/index";

export default function PharmacyAdminHero({
  data,
}: {
  data: PharmacyDetailsTypes;
}) {


  return (
    <div className="liquid-glass min-h-[400px] relative overflow-hidden">
      <div className="liquid-glass-effect z-1">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300/50 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-96 h-96 bg-purple-300/50 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-300/50 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 container mx-auto px-6 py-8">
          {/* Header with current date and time */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            {/* <CurrentDate /> */}
            <HeroPharmacyName data={data} />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PharmacyTotalDrugs />
            <PharmacyStatus data={data} />
            <PharmacyOnCallStatus data={data} />

            <HeroTotalOrders />
          </div>

          <PharmacyHeroCTA />
        </div>
      </div>
    </div>
  );
}
