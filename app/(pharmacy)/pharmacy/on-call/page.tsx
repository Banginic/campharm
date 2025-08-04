"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Phone,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const PharmacyOnCallDashboard = () => {
  // Mock pharmacy data - replace with your actual data source
  const [pharmacyInfo, setPharmacyInfo] = useState({
    name: "Downtown Pharmacy",
    license: "PH-2024-001",
    phone: "(555) 123-4567",
    address: "123 Main St, Downtown",
  });

  // State for on-call schedule
  const [onCallSchedule, setOnCallSchedule] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  // State for emergency contact info
  const [emergencyContact, setEmergencyContact] = useState({
    phone: "",
    alternatePhone: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Check if pharmacy is currently on call
  const isCurrentlyOnCall = () => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    return onCallSchedule[today];
  };

  // Handle day toggle
  const toggleDay = (day) => {
    setOnCallSchedule((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  // Handle emergency contact update
  const handleContactChange = (field, value) => {
    setEmergencyContact((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save on-call schedule
  const saveSchedule = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with your actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would make the actual API call to update the database
      // const response = await fetch('/api/pharmacy/oncall-schedule', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     schedule: onCallSchedule,
      //     emergencyContact
      //   })
      // });

      setMessage({
        type: "success",
        text: "On-call schedule updated successfully!",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to update schedule. Please try again.",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const activeDays = daysOfWeek.filter((day) => onCallSchedule[day]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="liquid-glass p-2 mb-6">
          <div className="liquid-glass-effect rounded-2xl p-6 ">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-neutral-900 mb-2">
                  OnCall Management
                </h1>
                <p className="text-neutral-600">
                  Manage your pharmacy's on-call availability
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className={`flex items-center px-4 py-2 rounded text-sm  ${
                    isCurrentlyOnCall()
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isCurrentlyOnCall() ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Currently On Call
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-1" />
                      Currently Off Call
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pharmacy Info Card */}
        <div className="liquid-glass mb-6 p-2">
          <div className="liquid-glass-effect rounded-xl p-6 ">
            <h2 className="lg:text-xl font-semibold text-neutral-700 mb-4 flex items-center">
              Pharmacy Information
            </h2>
            <hr className="border-neutral-400 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-500">Pharmacy Name</p>
                <p className="font-medium">{pharmacyInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">License Number</p>
                <p className="font-medium">{pharmacyInfo.license}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Phone Number</p>
                <p className="font-medium">{pharmacyInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Address</p>
                <p className="font-medium">{pharmacyInfo.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* On-Call Schedule */}
     <div className="liquid-glass mb-6 p-2">
         <div className="liquid-glass-effect p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Weekly On-Call Schedule
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {daysOfWeek.map((day) => (
              <div key={day} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-neutral-700">{day}</span>
                  <button
                    onClick={() => toggleDay(day)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      onCallSchedule[day] ? "bg-green-600" : "bg-neutral-400"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        onCallSchedule[day] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <div className="mt-2">
                  <span
                    className={`text-sm ${
                      onCallSchedule[day] ? "text-green-600" : "text-neutral-500"
                    }`}
                  >
                    {onCallSchedule[day] ? "On Call" : "Off Call"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule Summary */}
          <div className="bg-black/10 text-black/90 rounded-lg p-4">
            <h3 className="font-medium  mb-2">
              Current Schedule Summary
            </h3>
            {activeDays.length > 0 ? (
              <p className="text-neutral-700">
                On call:{" "}
                <span className="font-medium">{activeDays.join(", ")}</span>
              </p>
            ) : (
              <p className="text-red-400">No on-call days scheduled</p>
            )}
          </div>
        </div>
     </div>

        {/* Emergency Contact Information */}
        <div className="bg-red-100 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Emergency Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Primary Emergency Phone
              </label>
              <input
                type="tel"
                value={emergencyContact.phone}
                onChange={(e) => handleContactChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Alternate Phone
              </label>
              <input
                type="tel"
                value={emergencyContact.alternatePhone}
                onChange={(e) =>
                  handleContactChange("alternatePhone", e.target.value)
                }
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="(555) 987-6543"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Emergency Email
              </label>
              <input
                type="email"
                value={emergencyContact.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="emergency@pharmacy.com"
              />
            </div>
          </div>
        </div>

        {/* Save Button and Status Message */}
        <div className="flex items-center justify-between">
          <div>
            {message.text && (
              <div
                className={`flex items-center px-4 py-2 rounded-md ${
                  message.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <XCircle className="w-4 h-4 mr-2" />
                )}
                {message.text}
              </div>
            )}
          </div>

          <button
            onClick={saveSchedule}
            disabled={isLoading}
            className="bg-black hover:bg-black/70 disabled:bg-black/60 text-white px-6 py-2 rounded-md font-medium flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Clock className="w-4 h-4 mr-2" />
                Save Schedule
              </>
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800">Important Notes</h3>
              <ul className="mt-2 text-sm text-amber-700 space-y-1">
                <li>
                  • On-call status determines when your pharmacy is available
                  for emergency services
                </li>
                <li>
                  • Emergency contact information will be used by patients and
                  healthcare providers
                </li>
                <li>• Changes take effect immediately after saving</li>
                <li>
                  • Ensure emergency contact numbers are monitored during
                  on-call hours
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyOnCallDashboard;
