"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Package,
  UserCircle,
  Phone,
  MapPin,
  Users,
  Pill,
  UserPen,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function PharmacyAdminHero() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Sample pharmacy data - in a real app, this would come from your API/database
  const pharmacyData = {
    name: "MediCare Plus Pharmacy",
    location: "Downtown Medical Center",
    totalMedications: 2847,
    status: "open", // "open", "closed", "busy"
    onCallAvailable: true,
    onCallPharmacist: "Dr. Sarah Johnson",
    openingTime: "08:00",
    closingTime: "22:00",
    todayOrders: 156,
    pendingOrders: 23,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-500";
      case "closed":
        return "bg-red-500";
      case "busy":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "open":
        return "Open";
      case "closed":
        return "Closed";
      case "busy":
        return "Busy";
      default:
        return "Unknown";
    }
  };

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
            <div className="text-green-950/70  mb-4 lg:mb-0 liquid-glass p-3">
              <div className="flex items-center space-x-3 ">
                <Calendar className="size-4 text-green-950/70 " />
                <h2 className="text-xs lg:text-sm ">
                  {formatDate(currentTime)}
                </h2>
              </div>
            </div>

            {/* Pharmacy name and location */}
            <div className="text-right text-green-950  mt-8 lg:mt-0">
              <h1 className="text-xl lg:text-2xl font-bold ">
                {pharmacyData.name}
              </h1>
              <div className="flex items-center  space-x-2">
                <MapPin className="size-5 text-green-950/70" />
                <p className="text-green-950/70 text-sm">
                  {pharmacyData.location}
                </p>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Medications */}
            <div className=" p-4 liquid-glass border border-white/20 hover:bg-white/15 transition-all duration-300 transform lg:hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <Package className="size-5 lg:size-8 text-blue-500" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-950/70 ">
                    {pharmacyData.totalMedications.toLocaleString()}
                  </p>
                  <p className="text-green-950/60  text-sm">
                    Total Medications
                  </p>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className="liquid-glass p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform lg:hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`size-3 lg:size-4 rounded-full ${getStatusColor(
                      pharmacyData.status
                    )} animate-pulse`}
                  ></div>
                  <p className="text-green-950/70 text-sm font-semibold">
                    {getStatusText(pharmacyData.status)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-950/70 text-sm">Current Status</p>
                  <p className="text-green-950/70 text-sm">
                    {pharmacyData.openingTime} - {pharmacyData.closingTime}
                  </p>
                </div>
              </div>
            </div>

            {/* On-Call Status */}
            <div className="liquid-glass p-3 border border-white/20 hover:bg-white/15 transition-all duration-300 transform lg:hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-full">
                  <Phone className="size-5 lg:size-8 text-green-600" />
                </div>
                <div className="text-right">
                  <p className="text-green-950/70 text-lg font-semibold">
                    {pharmacyData.onCallAvailable ? "Available" : "Unavailable"}
                  </p>
                  <p className="text-green-950/60  text-sm">On-Call Service</p>
                  {pharmacyData.onCallAvailable && (
                    <p className="text-green-500 text-xs mt-1">
                      {pharmacyData.onCallPharmacist}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Today's Orders */}
            <div className="liquid-glass p-3 border border-white/20 hover:bg-white/15 transition-all duration-300 transform lg:hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/20 rounded-full">
                  <Users className=" size-5 lg:size-8 text-purple-600" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">
                    {pharmacyData.todayOrders}
                  </p>
                  <p className="text-blue-200 text-sm">Today's Orders</p>
                  <p className="text-yellow-300 text-xs mt-1">
                    {pharmacyData.pendingOrders} pending
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions bar */}
          <div className="flex justify-between items-center mt-8">
            <div className=" flex flex-wrap gap-4 j lg:justify-start">
              <Link
                href={"/pharmacy/profile"}
                className=" flex items-center gap-2 bg-black text-sm hover:bg-black/70 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform lg:hover:scale-105 shadow-lg cursor-pointer lg:hover:shadow-xl"
              >
                <UserCircle size={18} />
                <span className="text-sm text-white">Profile</span>
              </Link>
              <Link
                href={"/pharmacy/view-orders"}
                className=" flex items-center gap-2 bg-purple-600 text-sm hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform lg:hover:scale-105 shadow-lg cursor-pointer lg:hover:shadow-xl"
              >
                <Pill size={18} />
                <span className="text-sm text-white">View Orders</span>
              </Link>
              <Link
                href={"/pharmacy/staff-schedule"}
                className=" flex items-center gap-2 bg-green-600 text-sm hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform lg:hover:scale-105 shadow-lg cursor-pointer lg:hover:shadow-xl"
              >
                <UserPen size={18} />
                <span className="text-sm text-white">Staff Schedule</span>
              </Link>
              <Link
                href={"/pharmacy/Inventory-management"}
                className=" flex items-center gap-2 bg-blue-700 text-sm hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform lg:hover:scale-105 shadow-lg cursor-pointer lg:hover:shadow-xl"
              >
                <ShieldCheck size={18} />
                <span className="text-sm text-white">Manage Inventory</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
