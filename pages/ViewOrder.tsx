"use client";
import React from "react";
import { Clock, Package } from "lucide-react";
import { motion } from "framer-motion";

const ViewOrder = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="liquid-glass-effect shadow-lg rounded-2xl p-10 max-w-md w-full"
      >
        <div className="flex justify-center mb-4">
          <Package className="w-16 h-16 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          View Orders – Coming Soon
        </h1>
        <p className="text-gray-600 mb-6">
          We’re working hard to bring you this feature. You’ll soon be able to
          track and view all your orders here!
        </p>

        {/* Countdown Placeholder */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Clock className="text-blue-500" />
          <span className="text-gray-700 font-medium">Launching Soon...</span>
        </div>

        <button
          onClick={() => (window.location.href = "/pharmacy")}
          className="px-6 py-2 bg-blue-500 text-white font-semibold cursor-pointer rounded-xl shadow hover:bg-blue-600 transition"
        >
          Go Home
        </button>
      </motion.div>

      <p className="mt-6 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Banginic
      </p>
    </div>
  );
};

export default ViewOrder;
