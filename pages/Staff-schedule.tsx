"use client";
import React from "react";
import { CalendarClock, Users } from "lucide-react";
import { motion } from "framer-motion";

const ComingSoonStaffSchedule = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CalendarClock className="w-16 h-16 text-purple-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Staff Schedule – Coming Soon
        </h1>
        <p className="text-gray-600 mb-6">
          We're creating a scheduling system to help you manage staff shifts,
          availability, and duty assignments seamlessly.  
          This feature will be live soon!
        </p>

        {/* Status Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Users className="text-purple-500" />
          <span className="text-gray-700 font-medium">Feature in progress...</span>
        </div>

        <button
          onClick={() => (window.location.href = "/pharmacy")}
          className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-xl shadow hover:bg-purple-600 transition"
        >
          Go Home
        </button>
      </motion.div>

      <p className="mt-6 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Pharmacy App
      </p>
    </div>
  );
};

export default ComingSoonStaffSchedule;
