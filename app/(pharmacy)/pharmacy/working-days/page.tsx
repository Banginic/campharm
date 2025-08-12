"use client";
import React, { useState, ChangeEvent } from "react";
import { Save, RotateCcw } from "lucide-react";
import { useApiClient } from "@/hooks/useApiPharmacyClient";
import { toast } from "react-toastify";

// Define the shape of a single day's schedule
interface ScheduleDay {
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
}

// Define the shape of the weekly schedule
type Schedule = Record<
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday",
  ScheduleDay
>;

const defaultSchedule: Schedule = {
  monday: { openingTime: "08:00", closingTime: "18:00", isOpen: true },
  tuesday: { openingTime: "08:00", closingTime: "18:00", isOpen: true },
  wednesday: { openingTime: "08:00", closingTime: "18:00", isOpen: true },
  thursday: { openingTime: "08:00", closingTime: "18:00", isOpen: true },
  friday: { openingTime: "08:00", closingTime: "18:00", isOpen: true },
  saturday: { openingTime: "08:00", closingTime: "18:00", isOpen: true },
  sunday: { openingTime: "08:00", closingTime: "18:00", isOpen: false },
};

const PharmacyScheduleAdmin: React.FC = () => {
  const [schedule, setSchedule] = useState<Schedule>(defaultSchedule);
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<"" | "saving" | "saved">("");
  const { apiFetch } = useApiClient();
  const dayNames: Record<keyof Schedule, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  const handleTimeChange = (
    day: keyof Schedule,
    field: "openingTime" | "closingTime",
    value: string
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
    setHasChanges(true);
    setSaveStatus("");
  };

  const handleClosedToggle = (day: keyof Schedule) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isOpen: !prev[day].isOpen,
      },
    }));
    setHasChanges(true);
    setSaveStatus("");
  };

  const handleSave = async () => {
  try{
      const data = await apiFetch("/api/pharmacy/update-daily-schedule", {
      method: "PUT",
      body: JSON.stringify(schedule),
    });
    console.log(data)
  }
  catch(ex){
    if( ex instanceof Error){
      toast.error(ex.message)
    }
    toast.error('Error updating daily schedule.')
  }
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setHasChanges(false);
      setTimeout(() => setSaveStatus(""), 3000);
    }, 1000);
  };

  const handleReset = () => {
    setSchedule(defaultSchedule);
    setHasChanges(false);
    setSaveStatus("");
  };

  const copyToAll = (sourceDay: keyof Schedule) => {
    const sourceSchedule = schedule[sourceDay];
    const newSchedule: Schedule = {} as Schedule;

    (Object.keys(schedule) as (keyof Schedule)[]).forEach((day) => {
      newSchedule[day] = { ...sourceSchedule };
    });

    setSchedule(newSchedule);
    setHasChanges(true);
    setSaveStatus("");
  };

  return (
    <div className="w-[95%] max-w-xl mx-auto min-h-screen">
      <div className="rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl lg:text-4xl text-center font-bold">
                Pharmacy Schedule Management
              </h1>
              <p className="text-green-950/70 mt-1">
                Configure default opening and closing hours
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={!hasChanges || saveStatus === "saving"}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                hasChanges && saveStatus !== "saving"
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Save className="w-4 h-4" />
              {saveStatus === "saving" ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 text-sm py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Default
            </button>
          </div>

          {saveStatus === "saved" && (
            <div className="text-green-600 font-medium">
              Schedule saved successfully!
            </div>
          )}
        </div>

        {/* Schedule Grid */}
        <div className="space-y-4 p-2">
          {(Object.entries(dayNames) as [keyof Schedule, string][]).map(
            ([day, dayName]) => (
              <div
                key={day}
                className="p-2 rounded-xl border border-gray-700/50"
              >
                <div className="flex justify-between items-center my-2">
                  <h3 className="text-gray-900 text-sm">{dayName}</h3>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!schedule[day].isOpen}
                      onChange={() => handleClosedToggle(day)}
                      className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-600">Closed</span>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {schedule[day].isOpen ? (
                      <>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Open:</span>
                          <input
                            type="time"
                            value={schedule[day].openingTime}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleTimeChange(
                                day,
                                "openingTime",
                                e.target.value
                              )
                            }
                            className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Close:</span>
                          <input
                            type="time"
                            value={schedule[day].closingTime}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleTimeChange(
                                day,
                                "closingTime",
                                e.target.value
                              )
                            }
                            className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </>
                    ) : (
                      <span className="text-red-600 font-medium">CLOSED</span>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-3">Schedule Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {(Object.entries(dayNames) as [keyof Schedule, string][]).map(
              ([day, dayName]) => (
                <div key={day} className="flex justify-between">
                  <span className="font-medium text-gray-700">{dayName}:</span>
                  <span
                    className={
                      !schedule[day].isOpen ? "text-red-600" : "text-green-600"
                    }
                  >
                    {!schedule[day].isOpen
                      ? "Closed"
                      : `${schedule[day].openingTime} - ${schedule[day].closingTime}`}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyScheduleAdmin;
