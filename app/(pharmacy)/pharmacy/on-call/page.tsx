"use client";
import { useApiClient } from "@/hooks/useApiPharmacyClient";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/index";

type PharmacyInfo = {
  name: string;
  license: string;
  phone: string;
  address: string;
};

type OnCallSchedule = Record<
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday",
  boolean
>;

interface OnCallTypes {
  success: boolean,
  message?: string,
  error?: string;
 data: {
   id: number;
  day: string;
  openingTime: string;
  closingTime: string;
  isOnCall: boolean;
  isOpen: boolean
 }[] | []
}
type EmergencyContact = {
  phone: string;
  alternatePhone: string;
  email: string;
};

type Message = {
  type: "success" | "error" | "";
  text: string;
};

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const PharmacyOnCallDashboard: React.FC = () => {
  const [pharmacyInfo, setPharmacyInfo] = useState<PharmacyInfo>({
    name: "Downtown Pharmacy",
    license: "PH-2024-001",
    phone: "(555) 123-4567",
    address: "123 Main St, Downtown",
  });
  const { apiFetch } = useApiClient<OnCallTypes>()
const { data, isLoading: fetchLoader, isError } = useQuery({
    queryKey: ['pharmacy-is-on-call'],
    queryFn: () => apiFetch('/api/on-call/list-on-calls', { method: 'GET'})
  })

  const [onCallSchedule, setOnCallSchedule] = useState<OnCallSchedule>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>({
    phone: "",
    alternatePhone: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({ type: "", text: "" });

  if(!data) return <Loading />


  const isCurrentlyOnCall = (): boolean => {
    const today = new Date()
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
      const onCallDay =  data.data.find(day => day.day === today)
      return onCallDay?.isOnCall || false
  };

  const toggleDay = (day: keyof OnCallSchedule): void => {
    setOnCallSchedule((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  function isOnCallDay(day: string){
    const isOnCallDay = data?.data.find(item => item.day === day)
    return isOnCallDay?.isOnCall
  }

  const handleContactChange = (
    field: keyof EmergencyContact,
    value: string
  ): void => {
    setEmergencyContact((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveSchedule = async (): Promise<void> => {
    
    setIsLoading(true);
    try {
      const data =  apiFetch('/api/on-call/update-on-call', { method: 'PUT', body: JSON.stringify(onCallSchedule)})
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
                      ? "bg-green-50/30 text-green-500 font-semibold"
                      : "bg-red-50/30 text-red-500 font-semibold"
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

 
       

        {/* On-Call Schedule */}
        <div className="liquid-glass mb-6 p-2">
          <div className="liquid-glass-effect p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Weekly On-Call Schedule
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {daysOfWeek.map((day) => (
                <div key={day} className="border border-green-950/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-neutral-700 capitalize">
                      {day}
                    </span>
                    <button
                      onClick={() => toggleDay(day)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        onCallSchedule[day] || isOnCallDay(day) ? "bg-green-600" : "bg-neutral-400"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          onCallSchedule[day] 
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="mt-2">
                    <span
                      className={`text-sm ${
                        onCallSchedule[day] || isOnCallDay(day)
                          ? "text-green-600"
                          : "text-neutral-500"
                      }`}
                    >
                      {onCallSchedule[day] || isOnCallDay(day) ? "On Call" : "Off Call"}
                    </span>
                  </div>
                </div>
              ))}
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
                onChange={(e) =>
                  handleContactChange("phone", e.target.value)
                }
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
                onChange={(e) =>
                  handleContactChange("email", e.target.value)
                }
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
