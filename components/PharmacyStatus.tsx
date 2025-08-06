import { PharmacyDetailsTypes } from "@/models/types";
import React from "react";

export default function PharmacyStatus({
  data,
}: {
  data: PharmacyDetailsTypes;
}) {

      const getStatusColor = (status: boolean) => {
    switch (status) {
      case true:
        return "bg-green-500";
     case false:
        return "bg-red-500";
    
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: boolean) => {
    switch (status) {
      case true:
        return "Open";
      case false:
        return "Closed"
      default:
        return "Unknown";
    }
  };
  return (
    <div className="liquid-glass p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform lg:hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`size-3 lg:size-4 rounded-full ${getStatusColor(
              data.data[0].isOpen 
            )} animate-pulse`}
          ></div>
          <p className="text-green-950/70 text-sm font-semibold">
            {getStatusText(data.data[0].isOpen )}
          </p>
        </div>
        <div className="text-right">
          <p className="text-green-950/70 text-sm">Current Status</p>
          <p className="text-green-950/70 text-sm">
            {'08:00'} - {'18:00'}
          </p>
        </div>
      </div>
    </div>
  );
}
